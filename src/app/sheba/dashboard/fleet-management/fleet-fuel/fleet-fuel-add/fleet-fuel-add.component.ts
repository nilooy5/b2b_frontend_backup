import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-fleet-fuel-add',
    templateUrl: './fleet-fuel-add.component.html',
    styleUrls: ['./fleet-fuel-add.component.scss']
})
export class FleetFuelAddComponent implements OnInit {
    fuelInformation: FormGroup;
    showFuelInformationError = false;
    submittingFuel = false;
    showConfirmation = false;
    confirmMesssage: string;
    confirmTitle: string;
    confirmType: string;
    fuelId: any;
    vehicles: any[] = [];
    today: Date = new Date();
    files: any[] = [];
    fuelTypes: any[] = ['diesel', 'octane', 'cng', 'petrol'];

    constructor(
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
        private route: ActivatedRoute,
        private pop: PopAlertService,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.vehicles);
        });
    }

    ngOnInit() {
        this.fuelInformation = this.fb.group({
            vehicle: [this.vehicles[0].id, Validators.required],
            date: ['', Validators.required],
            time: ['', Validators.required],
            fuel_type: [this.fuelTypes[0], Validators.required],
            price: ['', Validators.required],
            quantity: ['', Validators.required],

            vendor_name: [''],
            vendor_address: [''],
            vendor_reference: [''],

            comment: [''],
            file: []
        });
    }

    setData(data) {
        this.vehicles = data as any[];
        console.log(this.vehicles);
    }

    submitFuel() {
        const data = this.fuelInformation.getRawValue();
        this.showFuelInformationError = true;

        const submitData = {
            vehicle_id: data.vehicle,
            date: this.getApiDateTimeFormat(data.date, data.time),
            price: data.price,
            volume: data.quantity,
            type: data.fuel_type,
            unit: 'ltr',
            comment: data.comment,
            station_name: data.vendor_name,
            station_address: data.vendor_address,
            reference: data.vendor_reference,
        };

        if (data.file) {
            submitData['file'] = data.file;
        }

        this.submittingFuel = true;

        this.http.postWithMultipleFiles('/v2/businesses/' + this.storage.user.business_id + '/fuel-logs', submitData).toPromise().then(res => {
            this.submittingFuel = false;
            if (res.code === 200) {
                this.pop.open(res.message);
                if (res.id) {
                    this.router.navigate(['/', 'dashboard', 'fleet-management', 'fuel', res.id]).catch(err => {
                        console.log(err);
                    });
                } else {
                    this.router.navigate(['/', 'dashboard', 'fleet-management', 'fuel']).catch(err => {
                        console.log(err);
                    });
                }
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.pop.open(err.message);
        });
    }

    handleFiles(queue) {
        this.files = queue.map(item => item.file.rawFile);
        this.fuelInformation.controls['file'].setValue(this.files);
    }

    getApiDateTimeFormat(date, time) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        let t = new Date(time),
            hour = t.getHours(),
            minute = t.getMinutes(),
            second = t.getSeconds();

        return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':');
    }

}
