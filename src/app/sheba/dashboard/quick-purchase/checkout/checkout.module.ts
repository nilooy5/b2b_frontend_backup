import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import {CheckoutComponent} from './checkout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmationModalModule} from '../../../modals/confirmation-modal/confirmation-modal.module';

@NgModule({
    declarations: [CheckoutComponent],
    imports: [
        CommonModule,
        CheckoutRoutingModule,
        FormsModule,
        ConfirmationModalModule,
        ReactiveFormsModule
    ]
})
export class CheckoutModule { }
