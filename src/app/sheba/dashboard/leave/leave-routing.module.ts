import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LeaveComponent} from './leave.component';

const routes: Routes = [
    {
        path: '',
        component: LeaveComponent,
        children: [
            {
                path: 'requests',
                loadChildren: './leave-requests/leave-requests.module#LeaveRequestsModule',
                data: {
                    name: 'Leave Requests'
                }
            },
            {
                path: 'balance',
                loadChildren: './leave-balance/leave-balance.module#LeaveBalanceModule',
                data: {
                    name: 'Leave Balance'
                }
            },
            {
                path: '**',
                redirectTo: 'requests'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LeaveRoutingModule {
}
