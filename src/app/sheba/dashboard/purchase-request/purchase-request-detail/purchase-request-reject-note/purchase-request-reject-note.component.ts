import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-purchase-request-form-select',
    templateUrl: './purchase-request-reject-note.component.html',
    styleUrls: ['./purchase-request-reject-note.component.scss'],
})
export class PurchaseRequestRejectNoteComponent implements OnInit {
    forms: any[];
    selected: -1;
    generalInformation: FormGroup;
    constructor( public dialogRef: MatDialogRef<PurchaseRequestRejectNoteComponent>,
                 @Inject(MAT_DIALOG_DATA) public data: { forms: any},
                 private fb: FormBuilder,
                ) {
        this.forms = this.data.forms;
    }

    ngOnInit() {
        this.generalInformation = this.fb.group({
            rejection_note: ['', Validators.required],
        });

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
        if (this.generalInformation.valid) {
            let generalInformation = this.generalInformation.getRawValue();
            this.dialogRef.close({rejection_note: generalInformation.rejection_note});
        }
    }

}
