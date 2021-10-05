import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetInspectionFailedItemListRoutingModule} from './fleet-inspection-failed-item-list-routing.module';
import {FleetInspectionFailedItemListComponent} from './fleet-inspection-failed-item-list.component';
import {ShebaWidgetsModule} from "../../../../../../modules/sheba-widgets/sheba-widgets.module";
import {MatTableModule} from "@angular/material";
import {FleetInspectionFailedItemDetailsModule} from "../fleet-inspection-failed-item-details/fleet-inspection-failed-item-details.module";
import {FleetInspectionFailedItemListFilterModule} from "./fleet-inspection-failed-item-list-filter/fleet-inspection-failed-item-list-filter.module";

@NgModule({
    declarations: [FleetInspectionFailedItemListComponent],
    imports: [
        CommonModule,
        FleetInspectionFailedItemListRoutingModule,
        ShebaWidgetsModule,
        MatTableModule,
        FleetInspectionFailedItemDetailsModule,
        FleetInspectionFailedItemListFilterModule
    ]
})
export class FleetInspectionFailedItemListModule {
}
