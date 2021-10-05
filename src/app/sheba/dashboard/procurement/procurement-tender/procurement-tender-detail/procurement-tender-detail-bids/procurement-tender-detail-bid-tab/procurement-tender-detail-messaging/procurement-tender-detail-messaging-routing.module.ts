import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {ProcurementTenderDetailMessagingComponent} from './procurement-tender-detail-messaging.component';
import {ProcurementBidDetailsService} from '../../../procurement-bid-details.service';
import {ProcurementTenderMessagesService} from '../../../../procurement-tender-messages.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderDetailMessagingComponent,
        resolve: {
            bidDetails: ProcurementBidDetailsService,
            messages: ProcurementTenderMessagesService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementTenderDetailMessagingRoutingModule { }
