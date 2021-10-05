import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent {
    onDeclineOrConfirm = new EventEmitter();
    constructor(
        public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { type: string, title: string, text: string, actionTextNo: string, actionTextYes: string }
    ) {
        console.log(data);
        dialogRef.disableClose = true;
    }

    buttonClick(btnType: string) {
        this.onDeclineOrConfirm.emit(btnType);
    }

}
