import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDetailsAssignmentRoutingModule } from './vehicle-details-assignment-routing.module';
import {VehicleDetailsAssignmentComponent} from './vehicle-details-assignment.component';

@NgModule({
  declarations: [
      VehicleDetailsAssignmentComponent
  ],
  imports: [
    CommonModule,
    VehicleDetailsAssignmentRoutingModule
  ]
})
export class VehicleDetailsAssignmentModule { }
