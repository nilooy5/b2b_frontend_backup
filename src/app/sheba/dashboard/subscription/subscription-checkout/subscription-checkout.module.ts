import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionCheckoutRoutingModule } from './subscription-checkout-routing.module';
import {SubscriptionCheckoutComponent} from './subscription-checkout.component';

@NgModule({
    declarations: [
        SubscriptionCheckoutComponent
    ],
    imports: [
        CommonModule,
        SubscriptionCheckoutRoutingModule
    ],
    exports: [
        SubscriptionCheckoutComponent
    ]
})
export class SubscriptionCheckoutModule { }
