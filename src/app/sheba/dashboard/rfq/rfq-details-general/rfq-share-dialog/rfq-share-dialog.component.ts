import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-rfq-share-dialog',
    templateUrl: './rfq-share-dialog.component.html',
    styleUrls: ['./rfq-share-dialog.component.scss']
})

export class RfqShareDialogComponent  {

    showCopyLinkText = false;

    constructor(
        public dialogRef: MatDialogRef<RfqShareDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { link: string; title?: string; description?: string; }
    ) {
        dialogRef.disableClose = true;
    }

    closeModal() {
        this.dialogRef.close();
    }

    copyLink() {
        this.showCopyLinkText = true;
        setTimeout(() => {
            this.showCopyLinkText = false;
        }, 5000);
    }
}
