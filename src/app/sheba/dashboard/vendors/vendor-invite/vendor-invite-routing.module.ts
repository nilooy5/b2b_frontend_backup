import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VendorInviteComponent} from "./vendor-invite.component";

const routes: Routes = [
    {
        path: '',
        component: VendorInviteComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendorInviteRoutingModule {
}
