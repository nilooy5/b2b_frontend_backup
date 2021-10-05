import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-fleet-driver-details',
    templateUrl: './fleet-driver-details.component.html',
    styleUrls: ['./fleet-driver-details.component.scss']
})
export class FleetDriverDetailsComponent implements OnInit {

    driverData: any;
    dueStatus: any;

    constructor(
        private route: ActivatedRoute,
        private storage: StorageService,
        private http: ShebaHttpService
    ) {
        this.route.params.subscribe(res => {
            this.licenseInfo(res.driver_id);
        });
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    ngOnInit() {
    }

    setData(data: any) {
        this.driverData = data.driver;
    }

    licenseInfo(id) {
        this.http.get('v2/members/' + this.storage.user.member_id + '/drivers/' + id + '/license-info').toPromise().then(res => {
           this.dueStatus = res.license_info.due_status;
        }).catch(err => console.error(err));
    }

}
