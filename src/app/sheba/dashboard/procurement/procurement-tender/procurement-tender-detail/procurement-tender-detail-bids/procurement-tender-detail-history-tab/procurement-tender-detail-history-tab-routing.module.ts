import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderDetailHistoryTabComponent} from './procurement-tender-detail-history-tab.component';
import {ProcurementBidHistoryService} from '../../procurement-bid-history.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderDetailHistoryTabComponent,
        resolve: {
            bidHistory: ProcurementBidHistoryService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderDetailHistoryTabRoutingModule { }
