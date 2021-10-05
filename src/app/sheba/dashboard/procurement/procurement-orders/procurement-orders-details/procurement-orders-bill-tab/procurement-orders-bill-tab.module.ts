import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementOrdersBillTabComponent } from './procurement-orders-bill-tab.component';
import { ProcurementOrdersBillTabRoutingModule } from './procurement-orders-bill-tab-routing.module';
import { ShebaPaymentModule } from '../../../../../../modules/sheba-payment/sheba-payment.module';
import { MatFormFieldModule, MatInputModule, MatTableModule } from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        ProcurementOrdersBillTabComponent
    ],
    imports: [
        CommonModule,
        ProcurementOrdersBillTabRoutingModule,
        ShebaPaymentModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ]
})

export class ProcurementOrdersBillTabModule { }
