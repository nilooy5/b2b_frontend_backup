import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-service-options',
    templateUrl: './service-options.component.html',
    styleUrls: ['./service-options.component.scss']
})

export class ServiceOptionsComponent implements OnInit {

    form: FormGroup;
    quantity: number = 1;
    formArray: FormArray;

    constructor(
        public dialogRef: MatDialogRef<ServiceOptionsComponent>,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: { options: any, min_quantity: any }
    ) {
        this.form = this.fb.group({});
        if (this.data.options.length === 1 && this.data.options[0].input_type === 'selectbox') {
            this.data.options[0].answers.forEach((option, index) => {
                this.form.addControl(index + '', new FormControl(index === 0));
            });
        } else {
            this.data.options.forEach((option, index) => {
                this.form.addControl(index + '', new FormControl(0));
            });
        }
    }

    ngOnInit() {
        this.quantity = this.data.min_quantity;
    }

    add() {
        const data = this.form.getRawValue();
        this.dialogRef.close({options: data, quantity: this.quantity});
    }

    close() {
        this.dialogRef.close();
    }

    updateQuantity(op) {
        if (op === 'increase') {
            this.quantity++;
        } else {
            if (this.quantity > 1) {
                this.quantity--;
            }
        }
    }

}
