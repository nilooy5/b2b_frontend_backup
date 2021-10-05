import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionOrdersRoutingModule } from './subscription-orders-routing.module';
import {SubscriptionOrdersComponent} from './subscription-orders.component';
import {MatButtonModule, MatProgressBarModule} from '@angular/material';

@NgModule({
    declarations: [
        SubscriptionOrdersComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressBarModule,
        SubscriptionOrdersRoutingModule
    ],
    exports: [
        SubscriptionOrdersComponent
    ]
})
export class SubscriptionOrdersModule { }
