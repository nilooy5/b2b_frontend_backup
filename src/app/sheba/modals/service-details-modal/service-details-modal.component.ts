import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-service-details-modal',
    templateUrl: './service-details-modal.component.html',
    styleUrls: ['./service-details-modal.component.scss']
})
export class ServiceDetailsModalComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ServiceDetailsModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { description: any, banner: any }
    ) { }

    ngOnInit() {
    }

    close() {
        this.dialogRef.close();
    }
}
