import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-co-workers-basic-confirm',
  templateUrl: './dialog-co-workers-basic-confirm.component.html',
  styleUrls: ['./dialog-co-workers-basic-confirm.component.scss']
})

export class DialogCoWorkersBasicConfirmComponent {

    onCompleteOrAdd = new EventEmitter();

    constructor(
        public dialogRef: MatDialogRef<DialogCoWorkersBasicConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { type: string, title: string, text: string, actionText?: string }
    ) {
        dialogRef.disableClose = true;
    }

    buttonClick(btnType: string) {
        this.onCompleteOrAdd.emit(btnType);
    }
}
