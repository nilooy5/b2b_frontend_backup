import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverVehicleRoutingModule } from './driver-vehicle-routing.module';
import {DriverVehicleComponent} from './driver-vehicle.component';

@NgModule({
  declarations: [
      DriverVehicleComponent
  ],
  imports: [
    CommonModule,
    DriverVehicleRoutingModule
  ]
})
export class DriverVehicleModule { }
