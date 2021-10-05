import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetDriverDetailsRoutingModule } from './fleet-driver-details-routing.module';
import { FleetDriverDetailsComponent } from './fleet-driver-details.component';
import {DriverCardComponent} from './driver-card/driver-card.component';

@NgModule({
  declarations: [FleetDriverDetailsComponent, DriverCardComponent],
  imports: [
    CommonModule,
    FleetDriverDetailsRoutingModule
  ]
})
export class FleetDriverDetailsModule { }
