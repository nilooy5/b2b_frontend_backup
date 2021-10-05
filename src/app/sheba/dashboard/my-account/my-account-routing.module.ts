import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyAccountComponent} from "./my-account.component";
import {ProfileService} from "../../../services/profile.service";

const routes: Routes = [
    {
        path: '',
        component: MyAccountComponent,
        resolve: {
            data: ProfileService
        },
        children: [
            {
                path: 'profile',
                loadChildren: './profile/profile.module#ProfileModule'
            },
            {
                path: 'company-profile',
                loadChildren: './company-profile/company-profile.module#CompanyProfileModule',
                resolve: {
                    data: ProfileService
                }
            },
            {
                path: '**',
                redirectTo: 'profile'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyAccountRoutingModule {
}
