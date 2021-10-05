import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionCartRoutingModule } from './subscription-cart-routing.module';
import {SubscriptionCartComponent} from './subscription-cart.component';
import {HeadersModule} from '../../../headers/headers.module';
import {ServiceCartModule} from '../../quick-purchase/service-cart/service-cart.module';
import {ServiceCartItemModule} from '../../quick-purchase/service-cart/service-cart-item/service-cart-item.module';

@NgModule({
    declarations: [
        SubscriptionCartComponent
    ],
    imports: [
        CommonModule,
        SubscriptionCartRoutingModule,
        HeadersModule,
        ServiceCartModule,
        ServiceCartItemModule
    ]
})
export class SubscriptionCartModule { }
