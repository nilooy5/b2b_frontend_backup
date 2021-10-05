import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveBalanceListRoutingModule } from './leave-balance-list-routing.module';
import { LeaveBalanceListComponent } from './leave-balance-list.component';
import { MatTableModule } from '@angular/material/table';
import { LeaveBalanceListFilterComponent } from './leave-balance-list-filter/leave-balance-list-filter.component';
import { MatButtonModule } from '@angular/material/button';
import {LeaveBalanceListEmptyComponent} from './leave-balance-list-empty/leave-balance-list-empty.component';

@NgModule({
  declarations: [
      LeaveBalanceListComponent,
      LeaveBalanceListFilterComponent,
      LeaveBalanceListEmptyComponent
  ],
    imports: [
        CommonModule,
        LeaveBalanceListRoutingModule,
        MatTableModule,
        MatButtonModule
    ]
})
export class LeaveBalanceListModule { }
