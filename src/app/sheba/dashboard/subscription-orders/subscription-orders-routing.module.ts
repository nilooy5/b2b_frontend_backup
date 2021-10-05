import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SubscriptionOrdersComponent} from './subscription-orders.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionOrdersComponent,
        children: [
            {
                path: '',
                loadChildren: './subscription-order-list/subscription-order-list.module#SubscriptionOrderListModule',
            },
            {
                path: ':subscription_order_id',
                loadChildren: './subscription-order-details/subscription-order-details.module#SubscriptionOrderDetailsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionOrdersRoutingModule {
}
