import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetRequestsRoutingModule} from './fleet-requests-routing.module';
import {FleetRequestsComponent} from './fleet-requests.component';
import {FleetRequestDetailsResolveService, FleetRequestsResolveService} from './fleet-request.service';
import {FleetVehicleResolveService} from '../fleet-assignment/fleet-assignment.service';
import {MatTabsModule} from '@angular/material';

@NgModule({
    declarations: [FleetRequestsComponent],
    imports: [
        CommonModule,
        FleetRequestsRoutingModule,
        MatTabsModule
    ],
    providers: [FleetRequestsResolveService, FleetRequestDetailsResolveService, FleetVehicleResolveService]
})
export class FleetRequestsModule {
}
