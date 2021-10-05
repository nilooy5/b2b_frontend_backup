import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleHistoryRoutingModule } from './vehicle-history-routing.module';
import {VehicleHistoryComponent} from './vehicle-history.component';

@NgModule({
  declarations: [
      VehicleHistoryComponent
  ],
  imports: [
    CommonModule,
    VehicleHistoryRoutingModule
  ]
})
export class VehicleHistoryModule { }
