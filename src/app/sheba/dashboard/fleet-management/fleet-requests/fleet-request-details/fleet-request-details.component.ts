import {Component, OnInit} from '@angular/core';
import {TripRequest} from "../../../../../types/fleet";
import {appConfig} from "../../../../../config/app.config";
import {ActivatedRoute} from "@angular/router";
import {FleetService} from "../../../../../services/fleet.service";
import {differenceInHours, differenceInMinutes} from 'date-fns';
import {PopAlertService} from "../../../../../modules/pop-alert/pop-alert.service";
import {getErrorMessage} from "../../../../../helpers/functions";
import {StorageService} from "../../../../../services/storage.service";
import {ShebaHttpModule} from '../../../../../modules/sheba-http/sheba-http.module';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';

@Component({
    selector: 'app-fleet-request-details',
    templateUrl: './fleet-request-details.component.html',
    styleUrls: ['./fleet-request-details.component.scss']
})
export class FleetRequestDetailsComponent implements OnInit {

    tripRequest: TripRequest;
    appConfig = appConfig;
    canUserAccess = false;

    approvers: any[] = [];
    showApproveAction = false;
    showAction = false;


    constructor(
        private route: ActivatedRoute,
        private service: FleetService,
        private pop: PopAlertService,
        private storage: StorageService,
        private http: ShebaHttpService
    ) {
        this.route.data.subscribe(res => {
            this.tripRequest = res.details;
            this.showAction = res.details.status === 'pending' && res.details.can_take_action === 1;
            this.approvers = this.tripRequest.trip_request_approvers;
        });
    }

    async ngOnInit() {
        this.canUserAccess = !!this.storage.user.is_super;
        const approval: any = await this.getUserApproval();
        console.log(this.tripRequest.can_approve === 1 , approval.status == 'pending', approval)
        this.showApproveAction = this.tripRequest.can_approve === 1 && approval.status == 'pending';
    }

    OnComments(state) {
        if (state) {
            this.resetTrip();
        }
    }

    resetTrip() {
        this.service.getTripRequestDetails(this.tripRequest.id).toPromise().then(res => {
            this.tripRequest = res;
        });
    }

    differenceText() {

        try {
            const start_date = new Date(Date.parse(this.tripRequest.start_date));
            const end_date = new Date(Date.parse(this.tripRequest.end_date));
            const diff = (differenceInHours(end_date, start_date) / 24);
            const remainHrs = (differenceInHours(end_date, start_date) % 24);
            const remainMins = (differenceInMinutes(end_date, start_date) % 60);
            return diff > 1 ? diff.toFixed(0) + ' Days ' + remainHrs + ' hrs ' + remainMins + ' minutes' : diff.toFixed(0) + ' Day ' + remainHrs + ' hrs ' + remainMins + ' minutes' ;
        } catch (e) {
            return '';
        }

    }

    reject() {
        this.service.postTrip({trip_request_id: this.tripRequest.id, status: 'reject'}).toPromise().then(res => {
            if (res.code === 200) {
                this.pop.open("Request has been rejected");
                this.tripRequest.status = 'reject'
            } else {
                this.pop.open(res.message);
            }
        }).catch(err => {
            this.pop.open(getErrorMessage(err));
        });
    }

    handleTripRequest(approve) {
        this.changeApprovalStatus(approve ? 'accepted' : 'rejected');
    }

    getFlowId() {
        return new Promise(resolve => {
            const approver = this.approvers.find(item => item.member_id == this.storage.user.member_id);
            resolve(approver ? approver.trip_request_approval_id : null);
        });
    }

    getUserApproval() {
        return new Promise(resolve => {
            const approver = this.approvers.find(item => item.member_id == this.storage.user.member_id);
            resolve(approver ? approver : null);
        });
    }

    async changeApprovalStatus(status) {
        const flowId = await this.getFlowId();

        this.http.post('/v2/members/'
            + this.storage.user.member_id
            + '/trip-request-approval/'
            + flowId
            + '/change-status', {
            status
        }).toPromise().then((res) => {
            if (res.code === 200) {
                location.reload();
                // this.showApproveAction = false;
            } else {
                this.pop.open('Please fill the form properly.');
            }
        });
    }
}
