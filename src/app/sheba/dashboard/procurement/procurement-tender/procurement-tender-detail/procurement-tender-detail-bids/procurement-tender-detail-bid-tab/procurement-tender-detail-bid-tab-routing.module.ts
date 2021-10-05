import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderDetailBidTabComponent} from './procurement-tender-detail-bid-tab.component';
import {ProcurementBidResolveService} from '../../procurement-bid-resolve.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderDetailBidTabComponent,
        children: [
            {
                path: '',
                loadChildren: './procurement-tender-detail-comparison/procurement-tender-detail-comparison.module#ProcurementTenderDetailComparisonModule',
                resolve: {
                    bids: ProcurementBidResolveService
                }
            },
            {
                path: 'messaging',
                loadChildren: './procurement-tender-detail-messaging/procurement-tender-detail-messaging.module#ProcurementTenderDetailMessagingModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderDetailBidTabRoutingModule { }
