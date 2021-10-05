import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SubscriptionListRoutingModule} from './subscription-list-routing.module';
import {SubscriptionListComponent} from './subscription-list.component';
import {SubscriptionServiceCardModule} from './subscription-service-card/subscription-service-card.module';
import { SubscriptionProcedureComponent } from './subscription-procedure/subscription-procedure.component';
import {HomeShowcaseModule} from '../../../general-root/home/home-showcase/home-showcase.module';
import { SubscriptionCategoryFilterComponent } from './subscription-category-filter/subscription-category-filter.component';

@NgModule({
    declarations: [
        SubscriptionListComponent,
        SubscriptionProcedureComponent,
        SubscriptionCategoryFilterComponent
    ],
    imports: [
        CommonModule,
        SubscriptionListRoutingModule,
        SubscriptionServiceCardModule,
        HomeShowcaseModule
    ],
    exports: [
        SubscriptionListComponent
    ]
})
export class SubscriptionListModule {
}
