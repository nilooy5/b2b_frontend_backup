import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RfqEditGeneralInfoComponent} from './rfq-edit-general-info.component';
import {MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import {MaterialDateRangePickerModule} from '../../../../../../../modules/material-date-range-picker/material-date-range-picker.module';

@NgModule({
    declarations: [RfqEditGeneralInfoComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MaterialDateRangePickerModule
    ],
    exports: [RfqEditGeneralInfoComponent],
    entryComponents: [RfqEditGeneralInfoComponent]
})
export class RfqEditGeneralInfoModule {
}
