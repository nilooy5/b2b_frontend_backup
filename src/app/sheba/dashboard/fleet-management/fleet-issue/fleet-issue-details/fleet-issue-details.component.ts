import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {environment} from '../../../../../../environments/environment';
import {FleetIssueCloseModalComponent} from './fleet-issue-close-modal/fleet-issue-close-modal.component';

@Component({
    selector: 'app-fleet-issue-details',
    templateUrl: './fleet-issue-details.component.html',
    styleUrls: ['./fleet-issue-details.component.scss']
})
export class FleetIssueDetailsComponent implements OnInit {
    issue: any;
    issueId: any;
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
        this.issueId = this.route.snapshot.params.issue_id;
        this.route.data.subscribe(res => {
            this.setData(res.issue);
        });
        this.attachmentUploadUrl = environment.api_url + '/v2/businesses/' + this.storage.user.business_id + '/issues/' + this.issueId + '/attachments?token=' + this.storage.user.token;
    }

    setData(data) {
        this.issue = data as any;
    }

    ngOnInit() {
        this.getAttachments();
        this.getComments();
    }

    getAttachments() {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/issues/' + this.issueId + '/attachments')
            .toPromise()
            .then(res => {
                this.attachments = res.attach_lists || [];
            });
    }

    getComments() {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/issues/' + this.issueId + '/comments')
            .toPromise()
            .then(res => {
                this.comments = res.comment_lists || [];
            });
    }

    handleUploaded() {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    handleComment() {
        this.getComments();
    }

    closeIssue() {
        this.dialog.open(FleetIssueCloseModalComponent, {
            data: { issueId: this.issueId},
            minWidth: '570px',
            minHeight: '250px',
            panelClass: 'dialog-confirmation'
        }).afterClosed().subscribe(close => {
            setTimeout(() => {
                window.location.reload();
            }, 500);
        });
    }

    requestService() {
        this.router.navigate(['/', 'dashboard', 'quick-purchase'], { queryParams: {issue_id: this.issueId}}).catch(err => {
            console.log(err);
        });
    }

    limitString(str) {
        return (str && str.length > 42) ? str.slice(0, 40) + '..' : str;
    }

}
