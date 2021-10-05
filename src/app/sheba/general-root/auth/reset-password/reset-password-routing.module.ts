import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ResetPasswordComponent} from "./reset-password.component";
import {ResetPasswordResolveService} from "./reset-password-resolve.service";

const routes: Routes = [
    {
        path: '',
        component: ResetPasswordComponent,
        canLoad: [ResetPasswordResolveService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ResetPasswordRoutingModule {
}
