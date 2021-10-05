import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InspectionScheduleListFilterComponent} from './inspection-schedule-list-filter.component';

@NgModule({
    declarations: [
        InspectionScheduleListFilterComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        InspectionScheduleListFilterComponent
    ]
})
export class InspectionScheduleListFilterModule { }
