import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionRoutingModule } from './inspection-routing.module';
import {InspectionComponent} from './inspection.component';
import {MatTabsModule} from "@angular/material";

@NgModule({
  declarations: [
      InspectionComponent
  ],
  imports: [
    CommonModule,
    InspectionRoutingModule,
      MatTabsModule
  ]
})
export class InspectionModule { }
