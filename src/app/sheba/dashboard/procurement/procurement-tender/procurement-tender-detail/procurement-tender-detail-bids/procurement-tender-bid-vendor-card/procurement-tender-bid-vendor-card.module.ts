import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementTenderBidVendorCardComponent } from './procurement-tender-bid-vendor-card.component';
import {MatButtonModule} from '@angular/material';

@NgModule({
    declarations: [ProcurementTenderBidVendorCardComponent],
    imports: [
        CommonModule,
        MatButtonModule
    ],
    exports: [ProcurementTenderBidVendorCardComponent]
})
export class ProcurementTenderBidVendorCardModule { }
