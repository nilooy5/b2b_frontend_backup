import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionPartnerComponent} from './subscription-partner.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionPartnerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionPartnerRoutingModule { }
