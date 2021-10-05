import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionComponent} from './subscription.component';
import {SubscriptionListService} from './subscription-list.service';
import {SubscriptionPartnerListService} from './subscription-partner-list.service';
import {SubscriptionDetailsService} from './subscription-details.service';
import {SubscriptionServiceCategoryListService} from './subscription-service-category-list.service';
import {SubscriptionTimeService} from './subscription-time.service';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionComponent,
        children: [
            {
                path: '',
                loadChildren: './subscription-list/subscription-list.module#SubscriptionListModule',
                resolve: {
                    subscriptions: SubscriptionListService,
                    categories: SubscriptionServiceCategoryListService
                }
            },
            {
                path: 'details',
                loadChildren: './subscription-details/subscription-details.module#SubscriptionDetailsModule'
            },
            {
                path: 'options',
                loadChildren: './subscription-options/subscription-options.module#SubscriptionOptionsModule',
                resolve: {
                    service: SubscriptionDetailsService
                }
            },
            {
                path: 'cart',
                loadChildren: './subscription-cart/subscription-cart.module#SubscriptionCartModule',
            },
            {
                path: 'additional',
                loadChildren: './subscription-additional/subscription-additional.module#SubscriptionAdditionalModule',
            },
            {
                path: 'schedule',
                loadChildren: './subscription-schedule/subscription-schedule.module#SubscriptionScheduleModule',
            },
            {
                path: 'time',
                loadChildren: './subscription-time/subscription-time.module#SubscriptionTimeModule',
                resolve: {
                    times: SubscriptionTimeService
                }
            },
            {
                path: 'partner',
                loadChildren: './subscription-partner/subscription-partner.module#SubscriptionPartnerModule',
                resolve: {
                    partners: SubscriptionPartnerListService
                }
            },
            {
                path: 'checkout',
                loadChildren: './subscription-checkout/subscription-checkout.module#SubscriptionCheckoutModule',
            },
            {
                path: 'payment',
                loadChildren: './subscription-payment/subscription-payment.module#SubscriptionPaymentModule',
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionRoutingModule { }
