import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-edit-row-modal',
    templateUrl: './edit-row-modal.component.html',
    styleUrls: ['./edit-row-modal.component.scss']
})
export class EditRowModalComponent implements OnInit {
    rowInformation: FormGroup;
    rowData: any[] = [];

    constructor(
        public dialogRef: MatDialogRef<EditRowModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any[],
        private fb: FormBuilder,
    ) {
        if (data) {
            this.rowData = data;
        }
    }

    ngOnInit() {
        this.rowInformation = this.fb.group({});
        this.rowData.forEach((item, index) => {
            this.rowInformation.addControl(index.toString(), new FormControl(item));
        });
    }

    close() {
        this.dialogRef.close();
    }

    submit() {
        const editedData = this.rowInformation.getRawValue();
        const exportData = [];
        for (const key in editedData) {
            if (editedData.hasOwnProperty(key)) {
                exportData.push(editedData[key]);
            }
        }
        this.dialogRef.close(exportData);
    }

}
