import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionFormDetailsRoutingModule } from './fleet-inspection-form-details-routing.module';
import { FleetInspectionFormDetailsComponent } from './fleet-inspection-form-details.component';

@NgModule({
  declarations: [FleetInspectionFormDetailsComponent],
  imports: [
    CommonModule,
    FleetInspectionFormDetailsRoutingModule
  ]
})
export class FleetInspectionFormDetailsModule { }
