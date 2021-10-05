import {Component, OnInit} from '@angular/core';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {ActivatedRoute} from '@angular/router';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {LeaveService} from '../../leave-services/leave.service';
import {StorageService} from '../../../../../services/storage.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

interface ApprovalDetails {
    id: any;
    status: any;
    type: any;
    department: any;
    leave: any;
    approvers: any[];
    attachments: any[];
}

@Component({
    selector: 'app-leave-requests-details',
    templateUrl: './leave-requests-details.component.html',
    styleUrls: ['./leave-requests-details.component.scss']
})
export class LeaveRequestsDetailsComponent implements OnInit {
    attachmentsOption: NgxGalleryOptions[];
    attachments: NgxGalleryImage[] = [];

    approval_details: ApprovalDetails;

    constructor(private http: ShebaHttpService,
                private route: ActivatedRoute,
                private leaveService: LeaveService,
                private storage: StorageService,
                private pop: PopAlertService) {
        this.route.data.subscribe(({leaveRequestDetailsResolver}) => {
            const {approval_details} = leaveRequestDetailsResolver;
            this.approval_details = approval_details;
            if (approval_details.attachments && approval_details.attachments.length > 0) {
                this.setAttachments(approval_details.attachments);
            }

        });
    }

    setAttachments(attachments) {
        this.attachmentsOption = [
            {
                width: '638px',
                height: '162px',
                image: false,
                previewZoom: true,
                previewRotate: true,
                thumbnailsMargin: 10,
                thumbnailsColumns: 4
            }
        ];
        attachments.forEach(item => {
            this.attachments.push({
                small: item.file,
                big: item.file
            });
        });
    }

    ngOnInit() {
    }

    approveOrRejectRequest(status) {
        if (this.approval_details.status.toLowerCase() === 'pending') {
            const data = {
                type_id: '[' + this.approval_details.id + ']',
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
