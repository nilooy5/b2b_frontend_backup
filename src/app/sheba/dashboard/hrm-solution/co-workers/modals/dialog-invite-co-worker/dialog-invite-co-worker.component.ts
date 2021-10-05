import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {TagInputComponent as SourceTagInput} from 'ngx-chips';
import {FormControl} from '@angular/forms';
import {throwError, of} from 'rxjs';
import {CoWorkersListService} from '../../co-workers-services/co-workers-list.service';
import {DialogInvitationSentComponent} from '../dialog-invitation-sent/dialog-invitation-sent.component';

@Component({
    selector: 'app-dialog-invite-co-worker',
    templateUrl: './dialog-invite-co-worker.component.html',
    styleUrls: ['./dialog-invite-co-worker.component.scss']
})

export class DialogInviteCoWorkerComponent implements OnInit {

    @ViewChild('tagInput')
    tagInput: SourceTagInput;
    splitPattern = new RegExp('[\," "\n]');
    public validators = [this.must_be_email.bind(this)];
    public errorMessages = {
        must_be_email: 'Please be sure to use a valid email format'
    };
    public onAddedFunc = this.beforeAdd.bind(this);

    private addFirstAttemptFailed = false;
    items = [];
    invalidedMail: boolean;

    private must_be_email(control: FormControl) {
        if (this.addFirstAttemptFailed && !this.validateEmail(control.value) && control.value) {
            this.invalidedMail = true;
            return {must_be_email: true};
        } else {
            this.invalidedMail = false;
        }
        return null;
    }

    constructor(public dialogRef: MatDialogRef<DialogInviteCoWorkerComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private coWorkerListService: CoWorkersListService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
    }

    onNoClick() {
        this.dialogRef.close();
    }

    private beforeAdd(tag: string) {
        if (!this.validateEmail(tag)) {
            if (!this.addFirstAttemptFailed) {
                this.addFirstAttemptFailed = true;
                this.tagInput.setInputValue(tag);
            }
            return throwError(this.errorMessages['must_be_email']);
        }
        this.addFirstAttemptFailed = false;
        return of(tag);
    }

    private validateEmail(text: any) {
        const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/i;
        return (text && (EMAIL_REGEXP.test(text) || EMAIL_REGEXP.test(text.value)));
    }

    sendInvitation() {
        const emails = this.items.map(x => x.value);
        const data = {
            emails: JSON.stringify(emails)
        };
        this.coWorkerListService.sendInvitation(data).subscribe(res => {
            if (res.code === 200) {
                this.openSuccessDialog();
                this.dialogRef.close(false);
            } else if (res.code === 303 || res.code === 422) {
                this.openPartialOrFullFailedDialog(res.message, res.description, res.link);
            } else {
                this.openFailDialog();
            }
        }, err => {
            this.openFailDialog();
        });
    }

    openPartialOrFullFailedDialog($title, $description, $link) {
        const dialogRef = this.dialog.open(DialogInvitationSentComponent, {
            width: '540px',
            height: '380px',
            data: {
                title: $title,
                description: $description,
                icon: '/assets/svg/icons/alert.svg',
                button_1: 'Download File',
                button_2: 'Try Again',
                type: 'failed_for_error',
                link: $link
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                //  this.getCoworkerRequestsStatusResponse('invited');
            }
        });
    }

    openSuccessDialog() {
        const dialogRef = this.dialog.open(DialogInvitationSentComponent, {
            width: '540px',
            height: '380px',
            data: {
                title: 'Invitation sent successfully',
                description: 'Co-workers will get invitation to get access to digiGO. Both co-workers or you can complete the co-worker profile from details',
                icon: '/assets/svg/icons/check.svg',
                button_1: 'Close',
                type: 'success'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                //  this.getCoworkerRequestsStatusResponse('invited');
            }
        });
    }

    openFailDialog() {
        const dialogRef = this.dialog.open(DialogInvitationSentComponent, {
            width: '540px',
            height: '380px',
            data: {
                title: 'Invitation sent failed',
                description: 'Something went terribly wrong! Please, try again later!',
                icon: '/assets/svg/cancel.svg',
                button_1: 'Close',
                button_2: 'Try Again',
                type: 'fail'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                //  this.getCoworkerRequestsStatusResponse('invited');
            }
        });
    }
}
