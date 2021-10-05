import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionOrderDetailsComponent} from './subscription-order-details.component';
import {SubscriptionOrderDetailsService} from '../subscription-order-details.service';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionOrderDetailsComponent,
        resolve: {
            orderDetails: SubscriptionOrderDetailsService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionOrderDetailsRoutingModule { }
