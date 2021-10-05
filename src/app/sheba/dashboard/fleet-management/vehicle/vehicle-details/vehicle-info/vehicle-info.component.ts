import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from "../../../../../../modules/sheba-http/sheba-http.service";
import {StorageService} from "../../../../../../services/storage.service";
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {FleetDriver} from "../../../../../../types/fleet";
import {Vendor} from "../../../../../../types/vendors";

@Component({
    selector: 'app-vehicle-info',
    templateUrl: './vehicle-info.component.html',
    styleUrls: ['./vehicle-info.component.scss']
})
export class VehicleInfoComponent implements OnInit {

    vehicleInformation: FormGroup;
    vehicleInformationData: any;
    registerInformation: FormGroup;
    registerInformationData: any;
    specsInformation: FormGroup;
    specsInformationData: any;
    fuelInformation: FormGroup;
    vehicleInformationFormEnable = false;
    registerInformationFormEnable = false;
    specsInformationFormEnable = false;
    fuelInformationFormEnable = false;
    savingChanges = false;
    vehicleId: any;
    TransmissonTypeOptions: string[] = ['auto', 'manual'];
    departments: any[] = [];
    vehicleDepartment: any;
    handlerInformations: { driver: FleetDriver, vendor: Vendor };

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });

        this.vehicleId = this.route.snapshot.parent.parent.params.vehicle_id;
    }

    ngOnInit() {
        this.vehicleInformation = this.fb.group({
            vehicleId: [this.vehicleInformationData.vehicle_id, Validators.required],
            modelYear: [this.vehicleInformationData.model_year, Validators.required],
            companyName: [this.vehicleInformationData.company_name, Validators.required],
            modelName: [this.vehicleInformationData.model_name, Validators.required],
            seatCapacity: [this.vehicleInformationData.seat_capacity, Validators.required],
            vehicleDepartment: [this.vehicleDepartment ? this.vehicleDepartment.id : '', Validators.required],
            vehicleType: [this.vehicleInformationData.type]
        });
        this.registerInformation = this.fb.group({
            vehicleNumber: [this.registerInformationData.vehicle_id],
            registrationNumber: [this.registerInformationData.license_number, Validators.required],
            taxToken: [this.registerInformationData.tax_token_number, Validators.required],
            fitnessStartDate: [this.registerInformationData.fitness_start_date, Validators.required],
            fitnessEndDate: [this.registerInformationData.fitness_end_date, Validators.required],
            licenseEndDate: [this.registerInformationData.license_number_end_date, Validators.required],
            insuranceDate: [this.registerInformationData.insurance_date, Validators.required]
        });
        this.specsInformation = this.fb.group({
            width: [this.specsInformationData.width_inch, Validators.required],
            height: [this.specsInformationData.height_inch, Validators.required],
            length: [this.specsInformationData.length_inch, Validators.required],
            cargoVolume: [this.specsInformationData.volume_ft, Validators.required],
            engineSummary: [(this.specsInformationData.engine_summary || ''), Validators.required],
            grossVehicleWeight: [this.specsInformationData.weight_kg, Validators.required],
            maxPayload: [this.specsInformationData.max_payload_kg, Validators.required],
            TransmissonType: [this.specsInformationData.transmission_type, Validators.required],
            Wheels: [this.specsInformationData.width_inch, Validators.required]
        });
        this.fuelInformation = this.fb.group({
            fuelType: ['123', Validators.required],
            fuelQuantity: ['123', Validators.required],
            fuelTankCapacity: ['123', Validators.required],
        });
    }

    setData(data: any) {
        this.vehicleInformationData = data.generalInfo;
        this.registerInformationData = data.registrationInfo;
        this.specsInformationData = data.SpecsInfo;
        this.departments = data.departments;
        this.vehicleDepartment = this.departments.find(dept => dept.name == this.vehicleInformationData.department);
        this.handlerInformations = data.handlerInfo
    }

    submitVehicleInformation() {
        const data = this.vehicleInformation.getRawValue();
        const submitData = {
            model_year: this.getApiFormat(data.modelYear),
            company_name: data.companyName,
            model_name: data.modelName,
            type: data.vehicleType,
            seat_capacity: data.seatCapacity,
            department_id: data.vehicleDepartment,
        };

        this.savingChanges = true;

        this.http.post('/v2/members/' + this.storage.user.member_id + '/vehicles/' + this.vehicleId + '/general-info', submitData).toPromise().then(res => {
            this.savingChanges = false;
            if (res.code === 200) {
                this.pop.open(res.message);
                this.vehicleInformationFormEnable = false;
                window.location.reload();
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.savingChanges = false;
            this.pop.open(err.message);
        });
    }

    submitRegisterInformation() {
        const data = this.registerInformation.getRawValue();
        const submitData = {
            license_number: data.registrationNumber,
            fitness_start_date: this.getApiFormat(data.fitnessStartDate),
            fitness_end_date: this.getApiFormat(data.fitnessEndDate),
            license_number_end_date: this.getApiFormat(data.licenseEndDate),
            insurance_date: this.getApiFormat(data.insuranceDate),
            tax_token_number: data.taxToken,
        };

        this.savingChanges = true;

        this.http.post('/v2/members/' + this.storage.user.member_id + '/vehicles/' + this.vehicleId + '/registration-info', submitData).toPromise().then(res => {
            this.savingChanges = false;
            if (res.code === 200) {
                this.pop.open(res.message);
                this.registerInformationFormEnable = false;
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.savingChanges = false;
            this.pop.open(err.message);
        });
    }

    submitSpecsInformation() {
        const data = this.specsInformation.getRawValue();
        const submitData = {
            height_inch: data.height,
            width_inch: data.width,
            length_inch: data.length,
            volume_ft: data.cargoVolume,
            weight_kg: data.grossVehicleWeight,
            max_payload_kg: data.maxPayload,
            engine_summary: data.engineSummary,
            transmission_type: data.TransmissonType,
        };

        this.savingChanges = true;

        this.http.post('/v2/members/' + this.storage.user.member_id + '/vehicles/' + this.vehicleId + '/specs', submitData).toPromise().then(res => {
            this.savingChanges = false;
            if (res.code === 200) {
                this.pop.open(res.message);
                this.specsInformationFormEnable = false;
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.savingChanges = false;
            this.pop.open(err.message);
        });
    }

    submitFuelInformation() {
        const data = this.fuelInformation.getRawValue();
        this.fuelInformationFormEnable = false;
    }

    untagDriver() {
        this.http.put('/v2/members/' + this.storage.user.member_id + '/vehicles/' + this.vehicleId + '/driver', {}).toPromise().then(res => {
            this.savingChanges = false;
            if (res.code === 200) {
                this.handlerInformations.driver = null;
                this.pop.open(res.message);
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.savingChanges = false;
            this.pop.open(err.message);
        });
    }

    getApiFormat(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

    limitString(str) {
        return (str && str.length > 22) ? str.slice(0, 20) + '..' : str;
    }

    dueStatus(data) {
        return data === 'Due Soon' ? 'due-soon' : 'overdue';
    }

    dueStatusDot(data) {
        return data === 'Due Soon' ? 'due-soon' : 'overdue';
    }

    isDue(data) {
        const fitnessDue = data.fitness_paper_due_status;
        const insuranceDue = data.insurance_paper_due_status;

        return fitnessDue || insuranceDue !== '';
    }

}
