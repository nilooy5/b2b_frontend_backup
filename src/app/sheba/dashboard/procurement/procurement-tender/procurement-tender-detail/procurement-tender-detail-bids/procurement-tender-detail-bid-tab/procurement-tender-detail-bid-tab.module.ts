import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderDetailBidTabRoutingModule } from './procurement-tender-detail-bid-tab-routing.module';
import {ProcurementTenderDetailBidTabComponent} from './procurement-tender-detail-bid-tab.component';
import {MatListModule} from '@angular/material';
import {ProcurementTenderBidVendorCardModule} from '../procurement-tender-bid-vendor-card/procurement-tender-bid-vendor-card.module';

@NgModule({
    declarations: [
        ProcurementTenderDetailBidTabComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderDetailBidTabRoutingModule,
        MatListModule,
        ProcurementTenderBidVendorCardModule
    ]
})
export class ProcurementTenderDetailBidTabModule { }
