import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {MatDialog} from '@angular/material';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-fleet-fuel-details',
    templateUrl: './fleet-fuel-details.component.html',
    styleUrls: ['./fleet-fuel-details.component.scss']
})
export class FleetFuelDetailsComponent implements OnInit {
    fuel: any;
    fuelId: any;
    attachmentUploadUrl: any;
    attachments: any[] = [];
    comments: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: ShebaHttpService,
        private storage: StorageService,
        public dialog: MatDialog,
    ) {
        this.fuelId = this.route.snapshot.params.fuel_id;
        this.route.data.subscribe(res => {
            this.setData(res.fuel);
        });

        this.attachmentUploadUrl = environment.api_url + '/v2/businesses/' + this.storage.user.business_id + '/fuel-logs/' + this.fuelId + '/attachments?token=' + this.storage.user.token;
    }

    ngOnInit() {
        this.getComments();
        this.getAttachments();
    }

    setData(data) {
        this.fuel = data as any;
    }

    handleComment() {
        this.getComments();
    }

    handleUploaded() {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    getComments() {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/fuel-logs/' + this.fuelId + '/comments')
            .toPromise()
            .then(res => {
                this.comments = res.comment_lists || [];
            });
    }

    getAttachments() {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/fuel-logs/' + this.fuelId + '/attachments')
            .toPromise()
            .then(res => {
                this.attachments = res.attach_lists || [];
            });
    }

    limitString(str) {
        return (str && str.length > 42) ? str.slice(0, 40) + '..' : str;
    }
}
