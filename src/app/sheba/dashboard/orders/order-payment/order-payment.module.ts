import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderPaymentComponent} from './order-payment.component';
import {OrderPaymentSuccessComponent} from './order-payment-success/order-payment-success.component';
import {OrderPaymentErrorComponent} from './order-payment-error/order-payment-error.component';
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [OrderPaymentComponent, OrderPaymentSuccessComponent, OrderPaymentErrorComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [OrderPaymentComponent, OrderPaymentSuccessComponent, OrderPaymentErrorComponent]
})
export class OrderPaymentModule {
}
