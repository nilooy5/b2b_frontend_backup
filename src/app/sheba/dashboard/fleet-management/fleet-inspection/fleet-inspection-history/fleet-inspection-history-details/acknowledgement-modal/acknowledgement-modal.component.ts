import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-acknowledgement-modal',
    templateUrl: './acknowledgement-modal.component.html',
    styleUrls: ['./acknowledgement-modal.component.scss']
})
export class AcknowledgementModalComponent implements OnInit {
    acknowledgeForm: FormGroup;
    noteError = null;

    constructor(
        public dialogRef: MatDialogRef<AcknowledgementModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.acknowledgeForm = this.fb.group({
            note: ['', Validators.required],
        });
    }

    close() {
        this.dialogRef.close();
    }

    submit() {
        const data = this.acknowledgeForm.getRawValue();

        if (data.note && data.note !== '') {
            this.noteError = null;
            this.dialogRef.close(data);
        } else  {
            this.noteError = 'You have write a note';
        }
    }
}
