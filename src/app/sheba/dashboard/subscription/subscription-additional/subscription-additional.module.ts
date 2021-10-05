import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubscriptionAdditionalRoutingModule} from './subscription-additional-routing.module';
import {SubscriptionAdditionalComponent} from './subscription-additional.component';
import {FormsModule} from '@angular/forms';
import {HeadersModule} from '../../../headers/headers.module';

@NgModule({
    declarations: [
        SubscriptionAdditionalComponent
    ],
    imports: [
        CommonModule,
        SubscriptionAdditionalRoutingModule,
        FormsModule,
        HeadersModule
    ],
    exports: [
        SubscriptionAdditionalComponent
    ]
})
export class SubscriptionAdditionalModule {
}
