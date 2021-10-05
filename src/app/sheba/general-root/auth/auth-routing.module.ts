import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'login',
                loadChildren: './login/login.module#LoginModule'
            },
            {
                path: 'sign-up',
                loadChildren: './signup/signup.module#SignupModule'
            },
            {
                path: 'forget-password',
                loadChildren: './forget-password/forget-password.module#ForgetPasswordModule'
            },
            {
                path: 'reset-password',
                loadChildren: './reset-password/reset-password.module#ResetPasswordModule',
            },
            {
                path: '**',
                redirectTo: 'login'

            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {
}
