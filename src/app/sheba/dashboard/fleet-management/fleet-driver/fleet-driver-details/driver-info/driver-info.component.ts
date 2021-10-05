import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-driver-info',
    templateUrl: './driver-info.component.html',
    styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit {

    generalInformation: FormGroup;
    generalInformationEnable: false;
    generalInformationData: any;
    driverId: number;
    savingChanges: false;

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
        this.generalInformation = this.fb.group({
            driverId: [this.generalInformationData.driver_id, Validators.required],
            driverName: [this.generalInformationData.name, Validators.required],
            dateOfBirth: [this.getApiFormat(this.generalInformationData.dob), Validators.required],
            bloodGroup: ['a+'],
            nid: [this.generalInformationData.nid_no, Validators.required],
            typeOfContract: ['monthly'],
        });
    }

    setData(data: any) {
        this.generalInformationData = data.generalInfo;
    }

    submitGeneralInfo() {
        const data = this.generalInformation.getRawValue();
        const submitData = {
            name: data.driverName,
            dob: this.getApiFormat(data.dateOfBirth),
            nid_no: data.nid,
        };

        this.http.post('/v2/members/' + this.storage.user.member_id + '/drivers/' + this.driverId + '/general-info', submitData).toPromise().then(res => {
            this.savingChanges = false;
            if (res.code === 200) {
                this.pop.open(res.message);
                this.generalInformationEnable = false;
                window.location.reload();
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

}
