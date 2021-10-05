import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionHistoryListRoutingModule } from './fleet-inspection-history-list-routing.module';
import {FleetInspectionHistoryListComponent} from './fleet-inspection-history-list.component';
import {MatTableModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FleetInspectionHistoryFilterModule} from './fleet-inspection-history-filter/fleet-inspection-history-filter.module';
import {DateRangePickerModule} from '../../../../../../modules/date-range-picker/date-range-picker.module';
import {ShebaWidgetsModule} from '../../../../../../modules/sheba-widgets/sheba-widgets.module';

@NgModule({
    declarations: [
        FleetInspectionHistoryListComponent
    ],
    imports: [
        CommonModule,
        FleetInspectionHistoryListRoutingModule,
        MatTableModule,
        FormsModule,
        FleetInspectionHistoryFilterModule,
        ShebaWidgetsModule
    ]
})
export class FleetInspectionHistoryListModule { }
