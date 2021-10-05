import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VendorDetailsCompanyInfoComponent} from "./vendor-details-company-info.component";

const routes: Routes = [
    {
        path: '',
        component: VendorDetailsCompanyInfoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendorDetailsCompanyInfoRoutingModule {
}
