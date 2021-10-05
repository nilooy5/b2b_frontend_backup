import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BulkUploadModalComponent} from './bulk-upload-modal.component';
import {MatDialogModule} from '@angular/material';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        BulkUploadModalComponent
    ],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule
    ],
    exports: [
        BulkUploadModalComponent
    ],
    entryComponents: [
        BulkUploadModalComponent
    ]
})
export class BulkUploadModalModule { }
