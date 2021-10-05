import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProcurementTenderDetailQuotationComponent} from './procurement-tender-detail-quotation.component';
import {ProcurementBidDetailsService} from '../procurement-bid-details.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderDetailQuotationComponent,
        resolve: {
            bidDetails: ProcurementBidDetailsService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementTenderDetailQuotationRoutingModule { }
