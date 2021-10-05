import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionRoutingModule } from './subscription-routing.module';
import {SubscriptionComponent} from './subscription.component';
import {MatButtonModule, MatProgressBarModule} from '@angular/material';
import {ServiceCartModule} from '../quick-purchase/service-cart/service-cart.module';
import { SubscriptionBreadcrumbComponent } from './subscription-breadcrumb/subscription-breadcrumb.component';

@NgModule({
    declarations: [
        SubscriptionComponent,
        SubscriptionBreadcrumbComponent
    ],
    imports: [
        CommonModule,
        SubscriptionRoutingModule,
        MatButtonModule,
        ServiceCartModule,
        MatProgressBarModule
    ],
    exports: [
        SubscriptionComponent
    ]
})
export class SubscriptionModule { }
