import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ScheduleRoutingModule } from './schedule-routing.module';
import {ScheduleComponent} from './schedule.component';
import {
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
} from '@angular/material';
import {HeadersModule} from '../../../headers/headers.module';
import {SchedulePickerModule} from '../../../../modules/schedule-picker/schedule-picker.module';
import {SliderDatePickerModule} from '../../../../modules/slider-date-picker/slider-date-picker.module';


@NgModule({
    declarations: [ScheduleComponent],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        HeadersModule,
        FormsModule,
        SchedulePickerModule,
        SliderDatePickerModule
    ],
    providers: [
        MatDatepickerModule,
    ],
})
export class ScheduleModule { }
