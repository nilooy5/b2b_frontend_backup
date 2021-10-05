import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubscriptionServiceCardComponent} from './subscription-service-card.component';
import {LazyLoadImageModule} from 'ng-lazyload-image';

@NgModule({
    declarations: [
        SubscriptionServiceCardComponent
    ],
    imports: [
        CommonModule,
        LazyLoadImageModule
    ],
    exports: [
        SubscriptionServiceCardComponent
    ]
})
export class SubscriptionServiceCardModule { }
