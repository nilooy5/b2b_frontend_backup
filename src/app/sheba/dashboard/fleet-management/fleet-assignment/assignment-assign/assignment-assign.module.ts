import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AssignmentAssignRoutingModule} from './assignment-assign-routing.module';
import {AssignmentAssignComponent} from './assignment-assign.component';
import {ShebaWidgetsModule} from "../../../../../modules/sheba-widgets/sheba-widgets.module";
import {FleetDriverResolveService} from "../../../../../services/fleet.service";
import {FleetVehicleResolveService} from "../fleet-assignment.service";

@NgModule({
    declarations: [AssignmentAssignComponent],
    imports: [
        CommonModule,
        AssignmentAssignRoutingModule,
        ShebaWidgetsModule
    ],
    providers: [
        FleetDriverResolveService,
        FleetVehicleResolveService
    ]
})
export class AssignmentAssignModule {
}
