import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetAssignmentRoutingModule} from './fleet-assignment-routing.module';
import {FleetAssignmentComponent} from './fleet-assignment.component';
import {
    FleetAssignmentDetailsResolveService, FleetTripRequestDetailsResolveService,
    FleetUserResolveService,
    FleetVehicleResolveService
} from "./fleet-assignment.service";
import {FleetDriverResolveService} from "../../../../services/fleet.service";

@NgModule({
    declarations: [FleetAssignmentComponent],
    imports: [
        CommonModule,
        FleetAssignmentRoutingModule
    ],
    providers: [
        FleetUserResolveService,
        FleetVehicleResolveService,
        FleetAssignmentDetailsResolveService,
        FleetDriverResolveService,
        FleetTripRequestDetailsResolveService
    ]
})
export class FleetAssignmentModule {
}
