import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ConfirmationConfig} from "../confirmation.service";

@Component({
    selector: 'app-simple-confirmation',
    templateUrl: './simple-confirmation.component.html',
    styleUrls: ['./simple-confirmation.component.scss']
})
export class SimpleConfirmationComponent implements OnInit {
    itemData = {
        title: 'Are You Sure? ',
        sub_title: '',
        okButtonText: 'Ok',
        cancelButtonText: 'Cancel',
    };

    constructor(
        private dialogRef: MatDialogRef<SimpleConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmationConfig
    ) {
        this.itemData = Object.assign(this.itemData, this.data);
    }

    ngOnInit() {
    }

    onOk() {
    }

    onCancel() {
    }

}
