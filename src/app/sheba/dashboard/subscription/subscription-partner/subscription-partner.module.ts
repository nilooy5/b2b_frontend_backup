import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionPartnerRoutingModule } from './subscription-partner-routing.module';
import {SubscriptionPartnerComponent} from './subscription-partner.component';
import {PartnerListItemModule} from '../../quick-purchase/partner-list/partner-list-item/partner-list-item.module';
import {HeadersModule} from '../../../headers/headers.module';

@NgModule({
    declarations: [
        SubscriptionPartnerComponent
    ],
    imports: [
        CommonModule,
        SubscriptionPartnerRoutingModule,
        PartnerListItemModule,
        HeadersModule,
    ],
    exports: [
        SubscriptionPartnerComponent
    ]
})
export class SubscriptionPartnerModule { }
