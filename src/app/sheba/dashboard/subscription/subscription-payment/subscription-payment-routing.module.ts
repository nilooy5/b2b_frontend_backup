import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionPaymentComponent} from './subscription-payment.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionPaymentComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionPaymentRoutingModule { }
