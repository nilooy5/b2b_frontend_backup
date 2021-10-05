import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-dialog-invitation-sent',
    templateUrl: './dialog-invitation-sent.component.html',
    styleUrls: ['./dialog-invitation-sent.component.scss']
})
export class DialogInvitationSentComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DialogInvitationSentComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }

    onNoClick() {
        this.dialogRef.close(false);
    }
}
