import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VendorsComponent} from "./vendors.component";
import {VendorService} from "../../../services/vendor.service";
import {MasterCategoriesService} from "./master-categories.service";

const routes: Routes = [
    {
        path: '',
        component: VendorsComponent,
        children: [
            {
                path: '',
                loadChildren: './vendor-list/vendor-list.module#VendorListModule',
                resolve: {
                    vendors: VendorService
                },
                data: {
                    name: 'Vendor List'
                },
            },
            {
                path: 'add',
                loadChildren: './vendor-add/vendor-add.module#VendorAddModule',
                data: {
                    name: 'Vendor Add'
                },
                resolve: {
                    masterCategory: MasterCategoriesService
                }
            },
            {
                path: 'invite',
                loadChildren: './vendor-invite/vendor-invite.module#VendorInviteModule',
                data: {
                    name: 'Vendor Invite'
                }
            },
            {
                path: ':vendor_id/details',
                loadChildren: './vendor-details/vendor-details.module#VendorDetailsModule',
                resolve: {
                    vendor: VendorService
                },
                data: {
                    name: 'Vendor Details'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendorsRoutingModule {
}
