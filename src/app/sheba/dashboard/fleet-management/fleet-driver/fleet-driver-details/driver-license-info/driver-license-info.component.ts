import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-driver-license-info',
    templateUrl: './driver-license-info.component.html',
    styleUrls: ['./driver-license-info.component.scss']
})
export class DriverLicenseInfoComponent implements OnInit {

    licenseInformation: FormGroup;
    licenseInformationEnable: false;
    licenseInformationData: any;
    driverId: number;
    savingChanges: false;
    departments: any[] = [];

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

        this.driverId = this.route.snapshot.parent.parent.params.driver_id;
    }

    ngOnInit() {
        this.licenseInformation = this.fb.group({
            vehicleType: [this.licenseInformationData.type, Validators.required],
            // companyName: [this.licenseInformationData.company_name, Validators.required],
            licenseNumber: [this.licenseInformationData.license_number, Validators.required],
            licenseEndDate: [this.getApiFormat(this.licenseInformationData.license_number_end_date), Validators.required],
            licenseClass: [this.licenseInformationData.license_class, Validators.required],
            issueAuthority: [this.licenseInformationData.issue_authority, Validators.required],
            department: [this.licenseInformationData.department_id, Validators.required],
        });
    }

    setData(data: any) {
        this.licenseInformationData = data.licenseInfo;
        this.departments = data.departments;
    }

    submitLicenseInfo() {
        const data = this.licenseInformation.getRawValue();
        const submitData = {
            department_id: data.department,
            license_number: data.licenseNumber.toString(),
            license_number_end_date: this.getApiFormat(data.licenseEndDate),
            license_class: data.licenseClass,
            nid_no: data.nid,
            type: data.vehicleType
        };

        this.http.post('/v2/members/' + this.storage.user.member_id + '/drivers/' + this.driverId + '/license-info', submitData).toPromise().then(res => {
            this.savingChanges = false;
            if (res.code === 200) {
                this.pop.open(res.message);
                this.licenseInformationEnable = false;
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

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return [year, month, day].join('-');
    }

    limitString(str) {
        return (str && str.length > 22) ? str.slice(0, 20) + '..' : str;
    }

    driverDueStatus(data) {
        return data === 'Due Soon' ? 'due-soon' : 'overdue';
    }

    driverDueStatusDot(data) {
        return data === 'Due Soon' ? 'due-soon' : 'overdue';
    }

}
