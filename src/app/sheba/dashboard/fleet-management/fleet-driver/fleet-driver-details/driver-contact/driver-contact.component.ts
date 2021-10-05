import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {User} from '../../../../../../types/users';
import {environment} from '../../../../../../../environments/environment';

@Component({
    selector: 'app-driver-contact',
    templateUrl: './driver-contact.component.html',
    styleUrls: ['./driver-contact.component.scss']
})
export class DriverContactComponent implements OnInit {

    contactInformation: FormGroup;
    contactInformationEnable: false;
    contactInformationData: any;
    driverId: number;
    savingChanges: false;
    user: User;
    account_url = environment.accounts_url;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });

        this.driverId = this.route.snapshot.parent.parent.params.driver_id;
        this.user = this.storage.user;
    }

    ngOnInit() {
        this.contactInformation = this.fb.group({
            email: [this.contactInformationData.email, Validators.required],
            mobile: [this.contactInformationData.mobile, Validators.required],
            address: [this.contactInformationData.address, Validators.required],
        });
    }

    setData(data: any) {
        this.contactInformationData = data.contactInfo;
    }

    submitContactInfo() {
        const data = this.contactInformation.getRawValue();
        const submitData = {
            email: data.email,
            mobile: data.mobile,
            address: data.address,
        };

        this.http.post('/v2/members/' + this.storage.user.member_id + '/drivers/' + this.driverId + '/contract-info', submitData).toPromise().then(res => {
            this.savingChanges = false;
            console.log(res);
            if (res.code === 200) {
                console.log(res);
            } else {
                console.log(res.message);
            }
        }).catch(err => {
            this.savingChanges = false;
            console.log(err.message);
        });

        this.contactInformationEnable = false;
    }

}
