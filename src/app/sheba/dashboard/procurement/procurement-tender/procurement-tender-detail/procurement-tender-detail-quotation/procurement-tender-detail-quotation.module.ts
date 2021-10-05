import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcurementTenderDetailQuotationComponent} from './procurement-tender-detail-quotation.component';
import {ProcurementTenderDetailQuotationRoutingModule} from './procurement-tender-detail-quotation-routing.module';
import {MatTableModule} from '@angular/material';

@NgModule({
    declarations: [
        ProcurementTenderDetailQuotationComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderDetailQuotationRoutingModule,
        MatTableModule
    ]
})
export class ProcurementTenderDetailQuotationModule { }
