import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ProcurementTenderDetailComponent } from './procurement-tender-detail.component';
import {ProcurementTenderDetailsService} from '../procurement-tender-details.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderDetailComponent,
        resolve: {
            procurementDetails: ProcurementTenderDetailsService
        },
        children: [
            {
                path: '',
                loadChildren: './procurement-tender-detail-bids/procurement-tender-detail-bids.module#ProcurementTenderDetailBidsModule'
            },
            {
                path: 'details',
                loadChildren: './procurement-tender-detail-form/procurement-tender-detail-form.module#ProcurementTenderDetailFormModule'
            },
            {
                path: 'quotation',
                loadChildren: './procurement-tender-detail-quotation/procurement-tender-detail-quotation.module#ProcurementTenderDetailQuotationModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementTenderDetailRoutingModule { }
