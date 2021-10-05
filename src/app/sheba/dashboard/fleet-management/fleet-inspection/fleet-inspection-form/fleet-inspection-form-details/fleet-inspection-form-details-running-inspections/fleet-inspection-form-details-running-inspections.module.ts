import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionFormDetailsRunningInspectionsRoutingModule } from './fleet-inspection-form-details-running-inspections-routing.module';
import { FleetInspectionFormDetailsRunningInspectionsComponent } from './fleet-inspection-form-details-running-inspections.component';
import {MatTableModule} from "@angular/material";
import {ShebaWidgetsModule} from "../../../../../../../modules/sheba-widgets/sheba-widgets.module";

@NgModule({
  declarations: [FleetInspectionFormDetailsRunningInspectionsComponent],
  imports: [
    CommonModule,
      MatTableModule,
      ShebaWidgetsModule,
    FleetInspectionFormDetailsRunningInspectionsRoutingModule
  ]
})
export class FleetInspectionFormDetailsRunningInspectionsModule { }
