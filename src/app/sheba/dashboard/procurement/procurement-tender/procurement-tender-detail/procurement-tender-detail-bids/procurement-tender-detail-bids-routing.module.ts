import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderDetailBidsComponent} from './procurement-tender-detail-bids.component';
import {ProcurementBidResolveService} from '../procurement-bid-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderDetailBidsComponent,
        children: [
            {
                path: '',
                loadChildren: './procurement-tender-detail-bid-tab/procurement-tender-detail-bid-tab.module#ProcurementTenderDetailBidTabModule',
                resolve: {
                    bids: ProcurementBidResolveService
                }
            },
            {
                path: 'history',
                loadChildren: './procurement-tender-detail-history-tab/procurement-tender-detail-history-tab.module#ProcurementTenderDetailHistoryTabModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderDetailBidsRoutingModule { }
