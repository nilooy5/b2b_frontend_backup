import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-fleet-issue-close-modal',
    templateUrl: './fleet-issue-close-modal.component.html',
    styleUrls: ['./fleet-issue-close-modal.component.scss']
})
export class FleetIssueCloseModalComponent implements OnInit {
    issueInformation: FormGroup;
    showFormValidationError = false;
    department: any;
    issueId: any;

    constructor(
        public dialogRef: MatDialogRef<FleetIssueCloseModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService,
        private route: ActivatedRoute,
    ) {
        this.issueId = data.issueId;
    }

    ngOnInit() {
        this.issueInformation = this.fb.group({
            note: ['', Validators.required],
        });
    }

    submit() {
        this.showFormValidationError = true;

        const data = this.issueInformation.getRawValue();

        if (data.note) {
            this.http.post('v2/businesses/' + this.storage.user.business_id + '/issues/' + this.issueId + '/close', data).toPromise().then(res => {
                if (res.code === 200) {
                    this.pop.open(res.message);
                    this.dialogRef.close(data);
                } else {
                    this.pop.open(res.message);
                }
            }).catch(err => {
                this.pop.open(err.message);
            });
        }
    }

    close() {
        this.dialogRef.close();
    }

}
