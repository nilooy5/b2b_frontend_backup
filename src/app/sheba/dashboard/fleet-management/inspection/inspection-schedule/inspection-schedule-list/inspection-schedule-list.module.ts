import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionScheduleListRoutingModule } from './inspection-schedule-list-routing.module';
import {InspectionScheduleListComponent} from './inspection-schedule-list.component';
import {MatTableModule} from '@angular/material';
import {InspectionScheduleListFilterModule} from './inspection-schedule-list-filter/inspection-schedule-list-filter.module';

@NgModule({
    declarations: [
        InspectionScheduleListComponent
    ],
    imports: [
        CommonModule,
        InspectionScheduleListRoutingModule,
        MatTableModule,
        InspectionScheduleListFilterModule
    ]
})
export class InspectionScheduleListModule { }
