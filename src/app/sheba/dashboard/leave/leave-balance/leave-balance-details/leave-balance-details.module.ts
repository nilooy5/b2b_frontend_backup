import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveBalanceDetailsRoutingModule } from './leave-balance-details-routing.module';
import {LeaveBalanceDetailsComponent} from './leave-balance-details.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { LeaveBalanceDetailsInfoComponent } from './leave-balance-details-info/leave-balance-details-info.component';
import { LeaveBalanceDetailsTableComponent } from './leave-balance-details-table/leave-balance-details-table.component';
import { LeaveBalanceDetailsSummaryComponent } from './leave-balance-details-summary/leave-balance-details-summary.component';

@NgModule({
  declarations: [
      LeaveBalanceDetailsComponent,
      LeaveBalanceDetailsInfoComponent,
      LeaveBalanceDetailsTableComponent,
      LeaveBalanceDetailsSummaryComponent
  ],
    imports: [
        CommonModule,
        LeaveBalanceDetailsRoutingModule,
        MatTableModule,
        MatButtonModule
    ]
})
export class LeaveBalanceDetailsModule { }
