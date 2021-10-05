import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-notify-modal',
  templateUrl: './notify-modal.component.html',
  styleUrls: ['./notify-modal.component.scss']
})
export class NotifyModalComponent {

    onConfirmOrError = new EventEmitter();

    constructor(
        public dialogRef: MatDialogRef<NotifyModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { type: string, title: string, text: string, actionTextOne: string, actionTextTwo: string }
    ) {
        dialogRef.disableClose = true;
    }

    buttonClick(btnType: string) {
        this.onConfirmOrError.emit(btnType);
    }
}
