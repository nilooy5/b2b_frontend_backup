import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionOngoingRoutingModule } from './fleet-inspection-ongoing-routing.module';
import { FleetInspectionOngoingComponent } from './fleet-inspection-ongoing.component';

@NgModule({
  declarations: [FleetInspectionOngoingComponent],
  imports: [
    CommonModule,
    FleetInspectionOngoingRoutingModule
  ]
})
export class FleetInspectionOngoingModule { }
