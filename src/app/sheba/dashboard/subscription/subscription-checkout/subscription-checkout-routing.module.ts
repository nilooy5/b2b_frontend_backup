import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionCheckoutComponent} from './subscription-checkout.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionCheckoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionCheckoutRoutingModule { }
