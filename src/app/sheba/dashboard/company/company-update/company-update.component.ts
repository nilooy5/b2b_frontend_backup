import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CompanyUpdateData} from "../../../../types/users";
import {FormEssentials} from "../../../../helpers/classes";
import {FormBuilder, Validators} from "@angular/forms";
import {CompanyService} from "../company.service";
import {City, ShebaLocation} from "../../../../types/general";
import {AlertService} from "../../../../modules/alert/alert.service";
import {PopAlertService} from "../../../../modules/pop-alert/pop-alert.service";
import {getErrorMessage} from "../../../../helpers/functions";

@Component({
    selector: 'app-company-update',
    templateUrl: './company-update.component.html',
    styleUrls: ['./company-update.component.scss']
})
export class CompanyUpdateComponent extends FormEssentials implements OnInit {
    cities: City[];
    items: ShebaLocation[] = [];
    @ViewChild('alertDiv') alertDiv: ElementRef;

    constructor(
        private  dialogRef: MatDialogRef<CompanyUpdateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CompanyUpdateData,
        private fb: FormBuilder,
        private service: CompanyService,
        private alert: AlertService,
        private pop: PopAlertService
    ) {
        super();

    }

    ngOnInit() {
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            no_employee: ['', Validators.required],
            address: ['', [Validators.required]],
            lat: ['', Validators.required],
            lng: ['', Validators.required]
        });
        this.service.getLocations().toPromise().then(res => {
            this.cities = res.cities;
            this.setItems();
        });
    }

    setLatLng(event) {
        let lat = null;
        let lng = null;
        if (event) {
            lat = event.center.lat;
            lng = event.center.lng
        }
        this.form.get('lat').setValue(lat);
        this.form.get('lng').setValue(lng);
    }

    getCityName(id: number) {
        return this.cities.find(function (city) {
            return city.id === id;
        }).name;
    }

    submit() {
        if (this.form.valid) {
            const data = this.form.getRawValue();
            this.submitting = true;
            this.service.updateBusinessInfo(data).toPromise().then(res => {
                this.submitting = false;
                if (res.code === 200) {
                    this.pop.open(res.message);

                    this.service.updateBusinessStatus().then(res => {
                        this.dialogRef.close(true);
                    });

                } else {
                    this.alert.error(this.alertDiv, res.message);
                }
            }).catch(err => {
                this.submitting = false;
                this.pop.open(getErrorMessage(err));
            });
        } else {
            this.alert.error(this.alertDiv, "Please fill out all the fields on the form correctly");
        }
    }

    setItems() {
        let self = this;
        const locations = this.cities.map(function (res) {
            res.locations = res.locations.map(function (location) {
                location.city_name = self.getCityName(location.city_id);
                return location
            });
            return res.locations;
        });
        let data = [];
        locations.forEach(function (res) {
            data = data.concat(res);
        });
        this.items = data;
    }

}
