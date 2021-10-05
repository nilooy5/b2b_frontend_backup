import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaveRequestsListComponent } from './leave-requests-list.component';
import { LeaveRequestsListResolverService } from '../../leave-services/leave-requests-list-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: LeaveRequestsListComponent,
        resolve: {
            leaveRequestsListResolver: LeaveRequestsListResolverService
        },
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LeaveRequestsListRoutingModule { }
