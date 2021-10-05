import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehicleAssignmentAllRoutingModule} from './vehicle-assignment-all-routing.module';
import {VehicleAssignmentAllComponent} from './vehicle-assignment-all.component';
import {VehicleAssignmentsFilterModule} from "./vehicle-assignments-filter/vehicle-assignments-filter.module";
import {FleetCalendarModule} from "../../../../../modules/fleet-calendar/fleet-calendar.module";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {MatProgressSpinnerModule} from "@angular/material";

@NgModule({
    declarations: [VehicleAssignmentAllComponent],
    imports: [
        CommonModule,
        VehicleAssignmentAllRoutingModule,
        VehicleAssignmentsFilterModule,
        FleetCalendarModule,
        LazyLoadImageModule.forRoot({}),
        MatProgressSpinnerModule
    ]
})
export class VehicleAssignmentAllModule {
}
