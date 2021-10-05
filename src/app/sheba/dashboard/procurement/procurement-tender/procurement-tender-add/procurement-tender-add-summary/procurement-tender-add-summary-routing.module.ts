import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcurementTenderAddSummaryComponent} from './procurement-tender-add-summary.component';
import {ProcurementTenderAddSummaryInvoiceComponent} from './procurement-tender-add-summary-invoice/procurement-tender-add-summary-invoice.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderAddSummaryComponent,
        children: [
            {
                path: 'invoice',
                loadChildren: './procurement-tender-add-summary-invoice/procurement-tender-add-summary-invoice.module#ProcurementTenderAddSummaryInvoiceModule',
                component: ProcurementTenderAddSummaryInvoiceComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderAddSummaryRoutingModule {
}
