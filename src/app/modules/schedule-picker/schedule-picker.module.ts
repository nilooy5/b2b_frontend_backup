import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulePickerComponent } from './schedule-picker.component';

@NgModule({
    declarations: [
        SchedulePickerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        SchedulePickerComponent
    ]
})
export class SchedulePickerModule { }
