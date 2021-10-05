import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-decline-modal',
  templateUrl: './confirm-decline-modal.component.html',
  styleUrls: ['./confirm-decline-modal.component.scss']
})
export class ConfirmDeclineModalComponent {

    onConfirmOrError = new EventEmitter();

    constructor(
        public dialogRef: MatDialogRef<ConfirmDeclineModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { type: string, title: string, text: string, actionTextOne: string, actionTextTwo: string }
    ) {
        dialogRef.disableClose = true;
    }

    buttonClick(btnType: string) {
        this.onConfirmOrError.emit(btnType);
    }
}
