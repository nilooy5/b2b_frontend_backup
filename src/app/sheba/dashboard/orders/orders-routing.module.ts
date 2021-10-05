import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrdersComponent} from "./orders.component";
import {OrderService} from "../../../services/order-service/order.service";

const routes: Routes = [
    {
        path: '',
        component: OrdersComponent,
        children: [
            {
                path: '',
                loadChildren: './order-lists/order-lists.module#OrderListsModule',
                resolve: {
                    orders: OrderService
                }
            },
            {
                path: ':order_id',
                loadChildren: './order-details/order-details.module#OrderDetailsModule',
                resolve: {
                    order: OrderService
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrdersRoutingModule {
}
