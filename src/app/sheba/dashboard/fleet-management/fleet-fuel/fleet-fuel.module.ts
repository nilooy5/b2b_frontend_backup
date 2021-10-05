import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetFuelRoutingModule } from './fleet-fuel-routing.module';
import {FleetFuelComponent} from './fleet-fuel.component';

@NgModule({
    declarations: [
        FleetFuelComponent
    ],
    imports: [
        CommonModule,
        FleetFuelRoutingModule
    ],
})
export class FleetFuelModule { }
