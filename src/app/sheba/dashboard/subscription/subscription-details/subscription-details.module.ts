import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionDetailsRoutingModule } from './subscription-details-routing.module';
import { SubscriptionDetailsComponent } from './subscription-details.component';
import { HeadersModule } from '../../../headers/headers.module';

@NgModule({
    declarations: [
        SubscriptionDetailsComponent
    ],
    imports: [
        CommonModule,
        SubscriptionDetailsRoutingModule,
        HeadersModule,
    ],
    exports: [
        SubscriptionDetailsComponent
    ]
})
export class SubscriptionDetailsModule { }
