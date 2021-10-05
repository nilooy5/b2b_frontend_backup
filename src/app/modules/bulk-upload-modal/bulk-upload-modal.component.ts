import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-bulk-upload-modal',
    templateUrl: './bulk-upload-modal.component.html',
    styleUrls: ['./bulk-upload-modal.component.scss']
})

export class BulkUploadModalComponent implements OnInit {

    @Output() upload: EventEmitter<any> = new EventEmitter();

    public info: any;
    public bulkFile: any = null;
    public showConfirmMsg = false;

    constructor(
        public dialogRef: MatDialogRef<BulkUploadModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder,
    ) {
        this.info = data;
    }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }


    importBulkFile(fileInput: any) {

        this.bulkFile = fileInput.target.files[0];

        // console.log(this.bulkFile)
    }

    uploadBulkFile(){
        // this.dialogRef.close(this.bulkFile);
        this.upload.emit(this.bulkFile);
    }

}
