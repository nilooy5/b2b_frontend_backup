import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubscriptionBillTabComponent} from './subscription-bill-tab.component';
import {ShebaPaymentModule} from '../../../../../modules/sheba-payment/sheba-payment.module';
import {MatButtonModule} from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        SubscriptionBillTabComponent
    ],
    exports: [
        SubscriptionBillTabComponent,
    ],
    imports: [
        CommonModule,
        ShebaPaymentModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ]
})
export class SubscriptionBillTabModule { }
