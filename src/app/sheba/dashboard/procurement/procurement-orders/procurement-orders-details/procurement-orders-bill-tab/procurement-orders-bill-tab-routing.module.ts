import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementOrdersBillTabComponent } from './procurement-orders-bill-tab.component';
import {ProcurementOrdersBillService} from '../procurement-orders-bill.service';
import {ProcurementOrdersPaymentSummaryService} from '../procurement-orders-payment-summary.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementOrdersBillTabComponent,
        resolve: {
            paymentRequests: ProcurementOrdersBillService,
            paymentSummary: ProcurementOrdersPaymentSummaryService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementOrdersBillTabRoutingModule { }
