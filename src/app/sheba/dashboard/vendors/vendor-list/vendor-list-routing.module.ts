import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VendorListComponent} from "./vendor-list.component";

const routes: Routes = [
    {
        path: '',
        component: VendorListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendorListRoutingModule {
}
