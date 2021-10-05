import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardResolveService} from "./sheba/dashboard/dashboard-resolve.service";
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
    {
        path: 'dashboard',
        loadChildren: './sheba/dashboard/dashboard.module#DashboardModule',
        canLoad: [
            DashboardResolveService
        ],
        resolve: {
            user: DashboardResolveService
        },
    },
    {
        path: '',
        loadChildren: './sheba/general-root/general-root.module#GeneralRootModule',
        canLoad: [
            DashboardResolveService
        ],
    },
    {
        path: '**',
        loadChildren: './modules/not-found/not-found.module#NotFoundModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
