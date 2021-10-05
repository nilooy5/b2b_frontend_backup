import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickPurchaseCartRoutingModule } from './quick-purchase-cart-routing.module';
import {QuickPurchaseCartComponent} from './quick-purchase-cart.component';
import {HeadersModule} from '../../../headers/headers.module';
import {ServiceCartItemModule} from '../service-cart/service-cart-item/service-cart-item.module';

@NgModule({
    declarations: [
        QuickPurchaseCartComponent
    ],
    imports: [
        CommonModule,
        QuickPurchaseCartRoutingModule,
        HeadersModule,
        ServiceCartItemModule,
    ]
})
export class QuickPurchaseCartModule { }
