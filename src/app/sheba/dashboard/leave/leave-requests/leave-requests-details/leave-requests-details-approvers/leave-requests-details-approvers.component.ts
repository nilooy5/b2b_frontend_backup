import {Component, Input, OnInit} from '@angular/core';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';

@Component({
    selector: 'app-leave-requests-details-approvers',
    templateUrl: './leave-requests-details-approvers.component.html',
    styleUrls: ['./leave-requests-details-approvers.component.scss']
})
export class LeaveRequestsDetailsApproversComponent implements OnInit {

    @Input() approvalDetails;

    constructor(private storage: StorageService,
                private pop: PopAlertService,
                private http: ShebaHttpService) {
    }

    ngOnInit() {
    }

    approveOrRejectRequest(status) {
        if (this.approvalDetails.status.toLowerCase() === 'pending') {
            const data = {
                type_id: '[' + this.approvalDetails.id + ']',
                status: status.toString()
            };
            const url = 'v2/businesses/' + this.storage.user.business_id + '/leaves/approval-requests/status';
            this.http.post(url, data).toPromise().then(res => {
                if ((res.code === 200) && (data.status === 'accepted')) {
                    this.pop.open('Leave Request Accepted');
                } else if ((res.code === 200) && (data.status === 'rejected')) {
                    this.pop.open('Leave Request Rejected');
                }

                setTimeout( () => {
                    window.location.href = window.location.href;
                }, 2000);
            });
        }
    }

}
