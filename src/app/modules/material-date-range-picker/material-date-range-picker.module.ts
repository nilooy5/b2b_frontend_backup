import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialDateRangePickerComponent } from './material-date-range-picker.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
    declarations: [
        MaterialDateRangePickerComponent
    ],
    exports: [
        MaterialDateRangePickerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxDaterangepickerMd.forRoot()
    ]
})

export class MaterialDateRangePickerModule { }
