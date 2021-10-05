import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetIssueRoutingModule } from './fleet-issue-routing.module';
import {FleetIssueComponent} from './fleet-issue.component';

@NgModule({
  declarations: [
      FleetIssueComponent
  ],
  imports: [
    CommonModule,
    FleetIssueRoutingModule
  ]
})
export class FleetIssueModule { }
