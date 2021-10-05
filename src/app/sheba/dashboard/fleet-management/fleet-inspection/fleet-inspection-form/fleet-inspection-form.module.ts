import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionFormRoutingModule } from './fleet-inspection-form-routing.module';
import { FleetInspectionFormComponent } from './fleet-inspection-form.component';

@NgModule({
  declarations: [FleetInspectionFormComponent],
  imports: [
    CommonModule,
    FleetInspectionFormRoutingModule
  ]
})
export class FleetInspectionFormModule { }
