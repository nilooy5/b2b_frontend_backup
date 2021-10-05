import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AttendanceMonthlyListComponent} from './attendance-monthly-list.component';
import {AttendanceMonthlyListRoutingModule} from './attendance-monthly-list-routing.module';
import { AttendanceMonthlyListFilterComponent } from './attendance-monthly-list-filter/attendance-monthly-list-filter.component';
import {MatButtonModule, MatTableModule, MatTabsModule} from '@angular/material';

@NgModule ({
    declarations: [
        AttendanceMonthlyListComponent,
        AttendanceMonthlyListFilterComponent
    ],
    imports: [
        CommonModule,
        AttendanceMonthlyListRoutingModule,
        MatTabsModule,
        MatTableModule,
        MatButtonModule
    ]
})

export class AttendanceMonthlyListModule {}
