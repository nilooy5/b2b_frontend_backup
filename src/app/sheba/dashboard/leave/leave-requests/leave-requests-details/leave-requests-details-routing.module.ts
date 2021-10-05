import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LeaveRequestsDetailsComponent} from './leave-requests-details.component';
import {LeaveRequestDetailsResolverService} from '../../leave-services/leave-request-details-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: LeaveRequestsDetailsComponent,
        resolve: {
            leaveRequestDetailsResolver: LeaveRequestDetailsResolverService
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRequestsDetailsRoutingModule { }
