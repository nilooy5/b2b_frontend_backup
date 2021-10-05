import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeaveBalanceComponent} from './leave-balance.component';

const routes: Routes = [
    {
        path: '',
        component: LeaveBalanceComponent,
        children: [
            {
                path: ':id',
                loadChildren: './leave-balance-details/leave-balance-details.module#LeaveBalanceDetailsModule',
                data: {
                    name: 'Leave Balance Details'
                }
            },
            {
                path: '',
                loadChildren: './leave-balance-list/leave-balance-list.module#LeaveBalanceListModule',
                data: {
                    name: 'Leave Balance List'
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveBalanceRoutingModule { }
