import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-loading-modal',
    templateUrl: './loading-modal.component.html',
    styleUrls: ['./loading-modal.component.scss']
})

export class LoadingModalComponent  {

    constructor(
        public dialogRef: MatDialogRef<LoadingModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { image: string, type: string, title: string, text: string }
    ) {
        dialogRef.disableClose = true;
    }

}
