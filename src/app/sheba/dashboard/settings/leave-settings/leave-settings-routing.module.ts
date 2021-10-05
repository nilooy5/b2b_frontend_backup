import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveSettingsComponent } from './leave-settings.component';
import { LeaveSettingsTypeComponent } from './leave-settings-type/leave-settings-type.component';
import { LeaveSettingsOthersComponent } from './leave-settings-others/leave-settings-others.component';
import {LeaveTypesResolverService} from './services/leave-types-resolver.service';
import {LeaveSettingsOthersEditComponent} from './leave-settings-others/leave-settings-others-edit/leave-settings-others-edit.component';
import {LeaveTypesOthersResolverService} from './services/leave-types-others-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: LeaveSettingsComponent,
        children: [
            {
                path: 'type',
                component: LeaveSettingsTypeComponent,
                resolve: {
                    leaveTypesListResolver: LeaveTypesResolverService
                }
            },
            {
                path: 'others',
                children: [
                    {
                        path: '',
                        component: LeaveSettingsOthersComponent,
                        resolve: {
                            leaveSettingOthersInfo: LeaveTypesOthersResolverService
                        }
                    },
                    {
                        path: 'edit',
                        component: LeaveSettingsOthersEditComponent,
                        resolve: {
                            leaveSettingOthersInfo: LeaveTypesOthersResolverService
                        }
                    }
                ]
            },
            {
                path: '**',
                redirectTo: 'type'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LeaveSettingsRoutingModule { }
