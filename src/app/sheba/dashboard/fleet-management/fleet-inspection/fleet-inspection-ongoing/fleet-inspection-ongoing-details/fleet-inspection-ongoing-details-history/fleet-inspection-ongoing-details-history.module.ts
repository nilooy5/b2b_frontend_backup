import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionOngoingDetailsHistoryRoutingModule } from './fleet-inspection-ongoing-details-history-routing.module';
import {FleetInspectionOngoingDetailsHistoryComponent} from './fleet-inspection-ongoing-details-history.component';
import {MatSelectModule, MatTableModule} from '@angular/material';

@NgModule({
    declarations: [
        FleetInspectionOngoingDetailsHistoryComponent
    ],
    imports: [
        CommonModule,
        FleetInspectionOngoingDetailsHistoryRoutingModule,
        MatTableModule,
        MatSelectModule,
    ]
})
export class FleetInspectionOngoingDetailsHistoryModule { }
