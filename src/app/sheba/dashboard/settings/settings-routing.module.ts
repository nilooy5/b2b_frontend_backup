import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from './settings.component';
import {SmsSettingsService} from './sms-settings.service';
import {SettingsHomeComponent} from './settings-home/settings-home.component';
// import {SettingsApprovalModule} from './leave-type.ts-settings/settings-approval.module';

const routes: Routes = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: '',
                component: SettingsHomeComponent
            },
            {
                path: 'sms',
                loadChildren: './sms-settings/sms-settings.module#SmsSettingsModule',
                resolve: {
                    templates: SmsSettingsService
                }
            },
            {
                path: 'approval',
                loadChildren: './settings-approval/settings-approval.module#SettingsApprovalModule'
            },
            {
                path: 'leave',
                loadChildren: './leave-settings/leave-settings.module#LeaveSettingsModule'
            },
            {
                path: 'office',
                loadChildren: './office-settings/office-settings.module#OfficeSettingsModule'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
