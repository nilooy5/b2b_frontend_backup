import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRoutingModule } from './leave-routing.module';
import {LeaveComponent} from './leave.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule, MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [
      LeaveComponent
  ],
    imports: [
        CommonModule,
        LeaveRoutingModule,
        MatTabsModule,
        MatMenuModule,
        MatDividerModule
    ]
})
export class LeaveModule { }
