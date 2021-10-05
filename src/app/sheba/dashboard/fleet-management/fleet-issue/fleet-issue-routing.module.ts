import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetIssueComponent} from './fleet-issue.component';
import {FleetIssueListService} from './fleet-issue-list.service';
import {FleetIssueDetailsService} from './fleet-issue-details.service';

const routes: Routes = [
    {
        path: '',
        component: FleetIssueComponent,
        children: [
            {
                path: '',
                loadChildren: './fleet-issue-list/fleet-issue-list.module#FleetIssueListModule',
                resolve: {
                    issues: FleetIssueListService
                }
            },
            {
                path: ':issue_id',
                loadChildren: './fleet-issue-details/fleet-issue-details.module#FleetIssueDetailsModule',
                resolve: {
                    issue: FleetIssueDetailsService
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetIssueRoutingModule { }
