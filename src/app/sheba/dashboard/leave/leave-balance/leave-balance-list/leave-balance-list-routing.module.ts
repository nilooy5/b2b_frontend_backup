import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeaveBalanceListComponent} from './leave-balance-list.component';
import {LeaveBalanceListResolverService} from '../../leave-services/leave-balance-list-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: LeaveBalanceListComponent,
        resolve: {
            leaveBalanceListResolver: LeaveBalanceListResolverService
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveBalanceListRoutingModule { }
