import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderDetailBidsRoutingModule } from './procurement-tender-detail-bids-routing.module';
import {ProcurementTenderDetailBidsComponent} from './procurement-tender-detail-bids.component';
import {MatTabsModule} from '@angular/material';

@NgModule({
    declarations: [
        ProcurementTenderDetailBidsComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderDetailBidsRoutingModule,
        MatTabsModule
    ]
})
export class ProcurementTenderDetailBidsModule { }
