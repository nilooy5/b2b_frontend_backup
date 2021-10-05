import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeaveRequestsComponent} from './leave-requests.component';

const routes: Routes = [
    {
        path: '',
        component: LeaveRequestsComponent,
        children: [
            {
                path: ':id',
                loadChildren: './leave-requests-details/leave-requests-details.module#LeaveRequestsDetailsModule',
                data: {
                    name: 'Leave Request Details'
                }
            },
            {
                path: '',
                loadChildren: './leave-requests-list/leave-requests-list.module#LeaveRequestsListModule',
                data: {
                    name: 'Leave Requests List'
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRequestsRoutingModule { }
