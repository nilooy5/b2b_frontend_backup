import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderDetailComparisonRoutingModule } from './procurement-tender-detail-comparison-routing.module';
import {ProcurementTenderDetailComparisonComponent} from './procurement-tender-detail-comparison.component';
import {NgSimpleSliderModule} from '../../../../../../../../modules/ng-simple-slider/ng-simple-slider.module';
import {ProcurementTenderBidVendorCardModule} from '../../procurement-tender-bid-vendor-card/procurement-tender-bid-vendor-card.module';
import {MatIconModule, MatTableModule} from '@angular/material';

@NgModule({
    declarations: [
        ProcurementTenderDetailComparisonComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderDetailComparisonRoutingModule,
        ProcurementTenderBidVendorCardModule,
        MatTableModule,
        MatIconModule
    ]
})
export class ProcurementTenderDetailComparisonModule { }
