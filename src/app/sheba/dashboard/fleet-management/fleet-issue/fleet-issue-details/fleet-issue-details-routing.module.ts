import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetIssueDetailsComponent} from './fleet-issue-details.component';

const routes: Routes = [
    {
        path: '',
        component: FleetIssueDetailsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetIssueDetailsRoutingModule { }
