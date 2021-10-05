import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionTimeRoutingModule } from './subscription-time-routing.module';
import {SubscriptionTimeComponent} from './subscription-time.component';
import {HeadersModule} from '../../../headers/headers.module';

@NgModule({
    declarations: [
        SubscriptionTimeComponent
    ],
    imports: [
        CommonModule,
        SubscriptionTimeRoutingModule,
        HeadersModule,
    ],
    exports: [
        SubscriptionTimeComponent
    ]
})
export class SubscriptionTimeModule { }
