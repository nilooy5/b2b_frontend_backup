import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubscriptionService} from './subscription.service';
import {OrderServiceConfig} from '../../types/orders';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        SubscriptionService
    ]
})
export class SubscriptionServiceModule {
    constructor(@Optional() @SkipSelf() parentModule: SubscriptionService) {
        if (parentModule) {
            throw  Error('Subscription Service is already imported');
        }
    }

    public static forRoot(config?: OrderServiceConfig): ModuleWithProviders {
        return {
            ngModule: SubscriptionServiceModule,
            providers: [{provide: OrderServiceConfig, useExisting: config}]
        };
    }
}
