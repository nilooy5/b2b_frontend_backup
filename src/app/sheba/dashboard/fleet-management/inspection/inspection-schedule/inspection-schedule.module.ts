import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionScheduleRoutingModule } from './inspection-schedule-routing.module';
import {InspectionScheduleComponent} from './inspection-schedule.component';

@NgModule({
  declarations: [
      InspectionScheduleComponent
  ],
  imports: [
    CommonModule,
    InspectionScheduleRoutingModule
  ]
})
export class InspectionScheduleModule { }
