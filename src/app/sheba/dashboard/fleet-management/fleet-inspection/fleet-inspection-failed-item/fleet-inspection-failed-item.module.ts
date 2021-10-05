import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionFailedItemRoutingModule } from './fleet-inspection-failed-item-routing.module';
import { FleetInspectionFailedItemComponent } from './fleet-inspection-failed-item.component';

@NgModule({
  declarations: [FleetInspectionFailedItemComponent],
  imports: [
    CommonModule,
    FleetInspectionFailedItemRoutingModule
  ]
})
export class FleetInspectionFailedItemModule { }
