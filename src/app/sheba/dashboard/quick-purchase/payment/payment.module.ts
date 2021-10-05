import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaymentRoutingModule} from './payment-routing.module';
import {PaymentComponent} from './payment.component';
import {OrderBillModule} from "../../orders/order-bill/order-bill.module";
import {OrderPaymentModule} from "../../orders/order-payment/order-payment.module";

@NgModule({
    declarations: [PaymentComponent],
    imports: [
        CommonModule,
        PaymentRoutingModule,
        OrderBillModule,
        OrderPaymentModule
    ]
})
export class PaymentModule {
}
