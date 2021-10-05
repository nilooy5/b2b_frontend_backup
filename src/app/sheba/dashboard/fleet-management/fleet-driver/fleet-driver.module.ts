import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetDriverRoutingModule} from './fleet-driver-routing.module';
import {FleetDriverComponent} from './fleet-driver.component';
import {FleetDriverResolveService} from "../../../../services/fleet.service";

@NgModule({
    declarations: [FleetDriverComponent],
    imports: [
        CommonModule,
        FleetDriverRoutingModule
    ],
    providers: [
        FleetDriverResolveService
    ]
})
export class FleetDriverModule {
}
