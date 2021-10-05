import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';

import { AttendanceMonthlyComponent } from './attendance-monthly.component';
import {AttendanceMonthlyRoutingModule} from './attendance-monthly-routing.module';


@NgModule({
    declarations: [
        AttendanceMonthlyComponent,
    ],
    imports: [
        CommonModule,
        AttendanceMonthlyRoutingModule,
    ]
})
export class AttendanceMonthlyModule { }
