import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {getErrorMessage} from "../../../../helpers/functions";
import {FormBuilder, Validators} from "@angular/forms";
import {CompanyService} from "../company.service";
import {AlertService} from "../../../../modules/alert/alert.service";
import {PopAlertService} from "../../../../modules/pop-alert/pop-alert.service";
import {FormEssentials} from "../../../../helpers/classes";
import {Company} from "../../../../types/users";
import {City, ShebaLocation} from "../../../../types/general";

@Component({
    selector: 'app-company-update-flat',
    templateUrl: './company-update-flat.component.html',
    styleUrls: ['./company-update-flat.component.scss']
})
export class CompanyUpdateFlatComponent extends FormEssentials implements OnInit {
    @Input() company: Company;
    cities: City[];
    items: ShebaLocation[] = [];
    @ViewChild('alertDiv') alertDiv: ElementRef;
    @Output() UpdateComplete: EventEmitter<boolean> = new EventEmitter<boolean>();
    location_id;

    constructor(
        private fb: FormBuilder,
        private service: CompanyService,
        private alert: AlertService,
        private pop: PopAlertService
    ) {
        super();
        this.form = this.fb.group({
            name: ['', [Validators.required]],
            no_employee: ['', Validators.required],
            address: ['', [Validators.required]],
            lat: ['', Validators.required],
            lng: ['', Validators.required]
        });


    }

    setLocations() {
        this.service.getLocations().toPromise().then(res => {
            this.cities = res.cities;
            this.setItems();
        });
    }

    setForm() {
        const data = {
            name: this.company.name,
            address: this.company.address,
            no_employee: this.company.employee_size,
            lat: this.company.geo_informations.lat,
            lng: this.company.geo_informations.lng
        };
        this.form.patchValue(data);
    }

    ngOnInit() {
        this.setForm();
        this.setLocations();

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
                        this.UpdateComplete.emit(true);
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
        this.setValue();
    }

    setValue() {
        const item = this.items.find(item => {
            return item.center.lat === this.company.geo_informations.lat && item.center.lng === this.company.geo_informations.lng;
        });
        return item;
    }
}
