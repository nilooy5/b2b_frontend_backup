import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionOptionsRoutingModule } from './subscription-options-routing.module';
import {SubscriptionOptionsComponent} from './subscription-options.component';
import {HeadersModule} from '../../../headers/headers.module';
import {
    MatButtonModule,
    MatCheckboxModule, MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule, MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceCartModule} from '../../quick-purchase/service-cart/service-cart.module';

@NgModule({
    declarations: [
        SubscriptionOptionsComponent
    ],
    imports: [
        CommonModule,
        SubscriptionOptionsRoutingModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatSelectModule,
        HeadersModule,
        ServiceCartModule
    ],
    exports: [
        SubscriptionOptionsComponent
    ]
})
export class SubscriptionOptionsModule { }
