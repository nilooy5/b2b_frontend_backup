import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {FormTemplateSelectSearchService} from "../../form-template-select-search/form-template-select-search.service";
import {MatDialogRef} from "@angular/material";
import {FormTemplateSelectSearchComponent} from "../../form-template-select-search/form-template-select-search/form-template-select-search.component";
import {of} from "rxjs";
import {delay} from "rxjs/operators";

@Component({
    selector: 'app-vehicle-add',
    templateUrl: './vehicle-add.component.html',
    styleUrls: ['./vehicle-add.component.scss']
})
export class VehicleAddComponent implements OnInit {

    isLinear = true;
    vehicleInformation: FormGroup;
    registrationInformation: FormGroup;
    otherInformation: FormGroup;
    showVehicleInformationError: boolean;
    showRegistrationInformationError: boolean;
    showOtherInformationError: boolean;
    submittingVehicle = false;
    showConfirmation = false;
    confirmMessage: string;
    confirmTitle: string;
    confirmType: string;
    vehicleId: any;
    departments: any[] = [];
    drivers: any[] = [];
    driverSelectionOptions: any[] = [];
    hasFormTemplate: boolean;
    formTemplates: any[] = [];
    vendors: any[] = [];
    hasVendor = false;

    constructor(
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
        private route: ActivatedRoute,
        private pop: PopAlertService,
        private templateSelect: FormTemplateSelectSearchService
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    setData(data) {
        this.departments = data.departments as any[];
        this.drivers = data.drivers as any[];
        this.vendors = data.vendors as any[];
        this.driverSelectionOptions = this.drivers.map(driver => {
            return {
                id: driver.id,
                title: driver.name,
                info: driver.mobile,
                picture: driver.picture
            };
        });
    }

    ngOnInit() {
        this.vehicleInformation = this.fb.group({
            vehicleImage: [''],
            vehicleType: ['hatchback', Validators.required],
            companyName: ['', Validators.required],
            modelName: ['', Validators.required],
            modelYear: ['', Validators.required],
            seatCapacity: ['', Validators.required],
            vehicleDepartment: [this.departments ? this.departments[0].id : ''],
        });
        this.registrationInformation = this.fb.group({
            licenseNumber: ['', Validators.required],
            licenseEndDate: ['', Validators.required],
            licenseImage: [''],
            registrationNumber: [''],
            taxTokenNumber: ['', Validators.required],
            taxTokenImage: [''],
            fitnessStartDate: ['', Validators.required],
            fitnessEndDate: ['', Validators.required],
            fitnessDocument: [''],
            insuranceNumber: ['', Validators.required],
            insuranceDocument: [''],
            insuranceDate: ['', Validators.required],
        });
        this.otherInformation = this.fb.group({
            transmissionType: ['auto', Validators.required],
            driver: [''],
            has_form_template: 0,
            has_vendor: 0,
        });
    }

    submitVehicle() {
        const vehicleData = this.vehicleInformation.getRawValue();
        const registrationData = this.registrationInformation.getRawValue();
        const otherData = this.otherInformation.getRawValue();

        const submitData = {
            type: vehicleData.vehicleType,
            vehicle_image: vehicleData.vehicleImage,
            company_name: vehicleData.companyName,
            model_name: vehicleData.modelName,
            model_year: this.getApiFormat('01-01-' + vehicleData.modelYear),
            seat_capacity: vehicleData.seatCapacity,
            department_id: vehicleData.vehicleDepartment,

            license_number: registrationData.licenseNumber,
            license_number_end_date: this.getApiFormat(registrationData.licenseEndDate),
            license_number_image: registrationData.licenseImage,
            tax_token_number: registrationData.taxTokenNumber,
            tax_token_image: registrationData.taxTokenImage,
            fitness_start_date: this.getApiFormat(registrationData.fitnessStartDate),
            fitness_end_date: this.getApiFormat(registrationData.fitnessEndDate),
            fitness_paper_image: registrationData.fitnessDocument,
            insurance_number: registrationData.insuranceNumber,
            insurance_paper_image: registrationData.insuranceDocument,
            insurance_date: this.getApiFormat(registrationData.insuranceDate),

            transmission_type: otherData.transmissionType,
            driver_id: otherData.driver,
        };
        if (this.otherInformation.get('has_form_template').value) {
            submitData['form_template_id'] = this.otherInformation.get('form_template_id').value;
        }
        if (this.otherInformation.get('has_vendor').value) {
            submitData['vendor_id'] = this.otherInformation.get('vendor_id').value;
        }

        this.submittingVehicle = true;

        this.http.postWithFiles('/v2/members/' + this.storage.user.member_id + '/vehicles', submitData).toPromise().then(res => {
            this.submittingVehicle = false;
            if (res.code === 200) {
                this.vehicleId = res.vehicle;
                this.showConfirmation = true;
                this.confirmType = 'success';
                this.confirmTitle = 'Request Successful!';
                this.confirmMessage = res.message || 'Vehicle Added successfully';
                if (res.inspection_id) {
                    of(res.inspection_id).pipe(delay(1000)).toPromise().then(id => {
                        this.router.navigate(['dashboard', 'fleet-management', 'inspection', 'ongoing', id, 'details']).catch(err => {
                            console.log(err);
                        });
                    });
                }
            } else {
                this.pop.open(res.message);
                // this.showConfirmation = true;
                // this.confirmType = 'failure';
                // this.confirmTitle = 'Request Failed';
                // this.confirmMessage = res.message;
            }
        }).catch(err => {
            this.submittingVehicle = false;
            this.showConfirmation = true;
            this.confirmType = 'failure';
            this.confirmTitle = 'Request Failed';
            this.confirmMessage = err.message;
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

    viewDetails() {
        this.router.navigate(['/', 'dashboard', 'fleet-management', 'vehicle', this.vehicleId, 'info']).catch(err => {
            console.log(err);
        });
    }

    hasFormTemplateChange() {
        const val = this.otherInformation.get('has_form_template').value;
        if (val) {
            this.hasFormTemplate = true;
            this.otherInformation.addControl('form_template_id', new FormControl(null, [Validators.required]));
        } else {
            this.hasFormTemplate = false;
            this.otherInformation.removeControl('form_template_id');
        }
    }

    showFormTemplateSelect(item: any) {
        let ref: MatDialogRef<FormTemplateSelectSearchComponent>;
        if (this.formTemplates.length) {
            ref = this.templateSelect.open({selectedItem: this.formTemplates[0]});
        } else {
            ref = this.templateSelect.open({selectedItem: null});
        }
        ref.afterClosed().subscribe(res => {
            if (res) {
                this.formTemplates[0] = res;
                this.otherInformation.get('form_template_id').setValue(res.id);
            }
            item.close();
        });
    }

    hasVendorChange() {
        const val = this.otherInformation.get('has_vendor').value;
        if (val) {
            this.hasVendor = true;
            this.otherInformation.addControl('vendor_id', new FormControl(null, [Validators.required]));
        } else {
            this.hasVendor = false;
            this.otherInformation.removeControl('vendor_id');
        }
    }

    showVendorSelect(item: any) {
        let ref: MatDialogRef<FormTemplateSelectSearchComponent>;
        if (this.vendors.length) {
            ref = this.templateSelect.open({selectedItem: this.vendors[0]});
        } else {
            ref = this.templateSelect.open({selectedItem: null});
        }
        ref.afterClosed().subscribe(res => {
            if (res) {
                this.vendors[0] = res;
                this.otherInformation.get('vendor_id').setValue(res.id);
            }
            item.close();
        });
    }
}
