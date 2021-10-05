import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GeneralRootComponent} from './general-root.component';

const routes: Routes = [
    {
        path: '',
        component: GeneralRootComponent,
        children: [
            {
                path: '',
                loadChildren: './home/home.module#HomeModule',
            },
            {
                path: 'features',
                loadChildren: './feature-landing/feature-landing.module#FeatureLandingModule'
            },

            {
                path: 'auth',
                loadChildren: './auth/auth.module#AuthModule'
            },
            {
                path: 'contact-us',
                loadChildren: './contact-us/contact-us.module#ContactUsModule',
            },
            {
                path: 'tender',
                loadChildren: '../../sheba/pages/tender/tender.module#TenderModule'
            },
            {
                path: 'digigo',
                loadChildren: '../../sheba/pages/digigo/digigo.module#DigigoModule',
            },
            {
                path: '**',
                redirectTo: ''
            }
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GeneralRootRoutingModule {
}
