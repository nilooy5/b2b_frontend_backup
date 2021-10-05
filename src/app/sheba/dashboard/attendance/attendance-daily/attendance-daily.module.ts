import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';

import { AttendanceDailyComponent } from './attendance-daily.component';
import {AttendanceDailyRoutingModule} from './attendance-daily-routing.module';


@NgModule({
    declarations: [
        AttendanceDailyComponent,
    ],
    imports: [
        CommonModule,
        AttendanceDailyRoutingModule,
    ]
})
export class AttendanceDailyModule { }
