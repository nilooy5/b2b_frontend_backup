import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionOrderDetailsRoutingModule } from './subscription-order-details-routing.module';
import {SubscriptionOrderDetailsComponent} from './subscription-order-details.component';
import {MatTabsModule} from '@angular/material';
import { SubscriptionDetailTabComponent } from './subscription-detail-tab/subscription-detail-tab.component';
import { SubscriptionOrderTabComponent } from './subscription-order-tab/subscription-order-tab.component';
import { SubscriptionBillTabComponent } from './subscription-bill-tab/subscription-bill-tab.component';
import { SubscriptionOrderTabModule } from './subscription-order-tab/subscription-order-tab.module';
import { SubscriptionDetailTabModule } from './subscription-detail-tab/subscription-detail-tab.module';
import { SubscriptionBillTabModule } from './subscription-bill-tab/subscription-bill-tab.module';
import { SubscriptionServiceProviderTabComponent } from './subscription-service-provider-tab/subscription-service-provider-tab.component';
import {OrderPaymentModule} from '../../orders/order-payment/order-payment.module';

@NgModule({
    declarations: [
        SubscriptionOrderDetailsComponent,
        SubscriptionServiceProviderTabComponent
    ],
    imports: [
        CommonModule,
        SubscriptionOrderDetailsRoutingModule,
        MatTabsModule,
        SubscriptionOrderTabModule,
        SubscriptionDetailTabModule,
        SubscriptionBillTabModule,
        OrderPaymentModule
    ],
    exports: [
        SubscriptionOrderDetailsComponent
    ]
})
export class SubscriptionOrderDetailsModule { }
