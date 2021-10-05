import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsApprovalComponent} from './settings-approval.component';

const routes: Routes = [
    {
        path: '',
        component: SettingsApprovalComponent,
        children: [
            {
                path: '',
                loadChildren: './approval-list/approval-list.module#ApprovalListModule'
            },
            {
                path: 'create',
                loadChildren: './approval-create/approval-create.module#ApprovalCreateModule'
            },
            {
                path: ':approval_id',
                loadChildren: './approval-details/approval-details.module#ApprovalDetailsModule'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsApprovalRoutingModule { }
