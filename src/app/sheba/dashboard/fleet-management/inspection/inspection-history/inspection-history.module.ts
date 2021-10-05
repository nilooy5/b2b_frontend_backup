import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionHistoryRoutingModule } from './inspection-history-routing.module';
import {InspectionHistoryComponent} from './inspection-history.component';

@NgModule({
  declarations: [
      InspectionHistoryComponent
  ],
  imports: [
    CommonModule,
    InspectionHistoryRoutingModule
  ]
})
export class InspectionHistoryModule { }
