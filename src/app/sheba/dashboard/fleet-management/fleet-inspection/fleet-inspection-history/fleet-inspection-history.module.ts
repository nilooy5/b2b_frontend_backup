import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionHistoryRoutingModule } from './fleet-inspection-history-routing.module';
import {FleetInspectionHistoryComponent} from './fleet-inspection-history.component';
import {FleetInspectionHistoryFilterModule} from './fleet-inspection-history-list/fleet-inspection-history-filter/fleet-inspection-history-filter.module';
import {MatTableModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        FleetInspectionHistoryComponent
    ],
    imports: [
        CommonModule,
        FleetInspectionHistoryRoutingModule,
    ]
})
export class FleetInspectionHistoryModule { }
