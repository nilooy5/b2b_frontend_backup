import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ShebaPaymentComponent} from './sheba-payment.component';

@NgModule({
    declarations: [
        ShebaPaymentComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ShebaPaymentComponent
    ]
})
export class ShebaPaymentModule { }
