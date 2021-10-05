import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionOngoingDetailsRoutingModule } from './fleet-inspection-ongoing-details-routing.module';
import { FleetInspectionOngoingDetailsComponent } from './fleet-inspection-ongoing-details.component';

@NgModule({
  declarations: [FleetInspectionOngoingDetailsComponent],
  imports: [
    CommonModule,
    FleetInspectionOngoingDetailsRoutingModule
  ]
})
export class FleetInspectionOngoingDetailsModule { }
