import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VendorDetailsComponent} from "./vendor-details.component";
import {VendorSpocInfoService} from './vendor-spoc-info.service';

const routes: Routes = [
    {
        path: '',
        component: VendorDetailsComponent,
        children: [
            {
                path: 'company-info',
                loadChildren: './vendor-details-company-info/vendor-details-company-info.module#VendorDetailsCompanyInfoModule'
            },
            {
                path: 'spoc-info',
                loadChildren: './vendor-details-spoc-info/vendor-details-spoc-info.module#VendorDetailsSpocInfoModule',
                resolve: {
                    info: VendorSpocInfoService
                }
            },
            {
                path:'**',
                redirectTo:'company-info'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendorDetailsRoutingModule {
}
