import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetInspectionFormListRoutingModule} from './fleet-inspection-form-list-routing.module';
import {FleetInspectionFormListComponent} from './fleet-inspection-form-list.component';
import {ShebaWidgetsModule} from "../../../../../../modules/sheba-widgets/sheba-widgets.module";

@NgModule({
    declarations: [FleetInspectionFormListComponent],
    imports: [
        CommonModule,
        FleetInspectionFormListRoutingModule,
        ShebaWidgetsModule
    ]
})
export class FleetInspectionFormListModule {
}
