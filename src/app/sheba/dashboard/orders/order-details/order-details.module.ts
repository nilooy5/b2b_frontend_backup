import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OrderDetailsRoutingModule} from './order-details-routing.module';
import {OrderDetailsComponent} from './order-details.component';
import {OrderBillModule} from "../order-bill/order-bill.module";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {OrderPaymentModule} from "../order-payment/order-payment.module";

@NgModule({
    declarations: [OrderDetailsComponent],
    imports: [
        CommonModule,
        OrderDetailsRoutingModule,
        OrderBillModule,
        LazyLoadImageModule.forRoot({}),
        OrderPaymentModule
    ]
})
export class OrderDetailsModule {
}
