import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubscriptionOrderListRoutingModule} from './subscription-order-list-routing.module';
import {SubscriptionOrderListComponent} from './subscription-order-list.component';
import {MatTableModule, MatTabsModule} from '@angular/material';
import { SubscriptionOrderFilterComponent } from './subscription-order-filter/subscription-order-filter.component';

@NgModule({
    declarations: [SubscriptionOrderListComponent, SubscriptionOrderFilterComponent],
    imports: [
        CommonModule,
        SubscriptionOrderListRoutingModule,
        MatTabsModule,
        MatTableModule,
    ]
})
export class SubscriptionOrderListModule {
}
