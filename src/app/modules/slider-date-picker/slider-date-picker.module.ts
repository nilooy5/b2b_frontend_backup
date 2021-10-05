import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderDatePickerComponent } from './slider-date-picker.component';
import {BlockSelectModule} from '../block-select/block-select.module';

@NgModule({
    declarations: [
        SliderDatePickerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SliderDatePickerComponent
    ]
})
export class SliderDatePickerModule { }
