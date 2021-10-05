import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetIssueListComponent} from './fleet-issue-list.component';

const routes: Routes = [
    {
        path: '',
        component: FleetIssueListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetIssueListRoutingModule { }
