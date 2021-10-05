import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetInspectionOngoingListRoutingModule} from './fleet-inspection-ongoing-list-routing.module';
import {FleetInspectionOngoingListComponent} from './fleet-inspection-ongoing-list.component';
import {ShebaWidgetsModule} from "../../../../../../modules/sheba-widgets/sheba-widgets.module";
import {MatTableModule} from "@angular/material";
import {FleetInspectionOngoingListFilterModule} from "./fleet-inspection-ongoing-list-filter/fleet-inspection-ongoing-list-filter.module";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [FleetInspectionOngoingListComponent],
    imports: [
        CommonModule,
        FleetInspectionOngoingListRoutingModule,
        ShebaWidgetsModule,
        MatTableModule,
        FleetInspectionOngoingListFilterModule,
        FormsModule
    ]
})
export class FleetInspectionOngoingListModule {
}
