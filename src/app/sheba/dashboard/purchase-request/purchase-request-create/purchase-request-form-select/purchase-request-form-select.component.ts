import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-purchase-request-form-select',
    templateUrl: './purchase-request-form-select.component.html',
    styleUrls: ['./purchase-request-form-select.component.scss'],
})
export class PurchaseRequestFormSelectComponent implements OnInit {
    forms: any[];
    selected: -1;
    constructor( public dialogRef: MatDialogRef<PurchaseRequestFormSelectComponent>,
                 @Inject(MAT_DIALOG_DATA) public data: { forms: any}
                ) {
        this.forms = this.data.forms;
    }

    ngOnInit() {
    }


    select() {
        // const data = this.form.getRawValue();
        this.dialogRef.close(/*{options: data, quantity: this.quantity}*/);
    }

    close() {
        this.dialogRef.close();
    }

    selectForm(index) {
        this.selected = index;
    }

    closeModal(status) {
        this.close();
    }

    next() {
        this.dialogRef.close({selected: this.selected});
    }

}
