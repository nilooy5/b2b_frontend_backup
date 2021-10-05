import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionOngoingDetailsScheduleRoutingModule } from './fleet-inspection-ongoing-details-schedule-routing.module';
import {FleetInspectionOngoingDetailsScheduleComponent} from './fleet-inspection-ongoing-details-schedule.component';
import {MatSelectModule, MatTableModule} from '@angular/material';

@NgModule({
    declarations: [
        FleetInspectionOngoingDetailsScheduleComponent
    ],
    imports: [
        CommonModule,
        FleetInspectionOngoingDetailsScheduleRoutingModule,
        MatTableModule,
        MatSelectModule,
    ]
})
export class FleetInspectionOngoingDetailsScheduleModule { }
