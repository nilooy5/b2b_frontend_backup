import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionPaymentRoutingModule } from './subscription-payment-routing.module';
import {SubscriptionPaymentComponent} from './subscription-payment.component';
import {ShebaPaymentModule} from '../../../../modules/sheba-payment/sheba-payment.module';
import {ShebaBillModule} from '../../../../modules/sheba-bill/sheba-bill.module';

@NgModule({
    declarations: [
        SubscriptionPaymentComponent
    ],
    imports: [
        CommonModule,
        SubscriptionPaymentRoutingModule,
        ShebaPaymentModule,
        ShebaBillModule
    ],
    exports: [
        SubscriptionPaymentComponent
    ]
})
export class SubscriptionPaymentModule { }
