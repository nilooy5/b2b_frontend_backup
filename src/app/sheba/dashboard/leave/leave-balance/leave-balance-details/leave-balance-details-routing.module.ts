import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeaveBalanceDetailsComponent} from './leave-balance-details.component';
import {LeaveBalanceDetailsResolverService} from '../../leave-services/leave-balance-details-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: LeaveBalanceDetailsComponent,
        resolve: {
            leaveBalanceDetailsResolver: LeaveBalanceDetailsResolverService
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveBalanceDetailsRoutingModule { }
