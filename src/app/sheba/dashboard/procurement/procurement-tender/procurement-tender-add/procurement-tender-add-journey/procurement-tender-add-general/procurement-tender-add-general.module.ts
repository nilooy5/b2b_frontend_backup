import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementTenderAddGeneralRoutingModule } from './procurement-tender-add-general-routing.module';
import { ProcurementTenderAddGeneralComponent } from './procurement-tender-add-general.component';
import {
    MatButtonModule,
    MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
    MatFormFieldModule, MatIconModule,
    MatInputModule, MatNativeDateModule,
    MatRadioModule, MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateRangePickerModule } from '../../../../../../../modules/date-range-picker/date-range-picker.module';
import { TagInputModule } from 'ngx-chips';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
    declarations: [
        ProcurementTenderAddGeneralComponent
    ],
    imports: [
        CommonModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ProcurementTenderAddGeneralRoutingModule,
        DateRangePickerModule,
        TagInputModule,
        MatChipsModule,
        MatIconModule,
        FileUploadModule
    ],
    exports: [
        ProcurementTenderAddGeneralComponent
    ]
})
export class ProcurementTenderAddGeneralModule { }
