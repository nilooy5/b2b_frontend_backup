import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementTenderAddSummaryComponent } from './procurement-tender-add-summary.component';
import { ProcurementTenderAddSummaryRoutingModule } from './procurement-tender-add-summary-routing.module';
import {MatFormFieldModule, MatRadioModule, MatTableModule, MatInputModule, MatCheckboxModule, MatChipsModule} from '@angular/material';
import { ProcurementTenderAddSummaryInvoiceComponent } from './procurement-tender-add-summary-invoice/procurement-tender-add-summary-invoice.component';

@NgModule({
    declarations: [
        ProcurementTenderAddSummaryComponent,
        ProcurementTenderAddSummaryInvoiceComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderAddSummaryRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatCheckboxModule,
        MatChipsModule,
    ],
    exports: [
        ProcurementTenderAddSummaryComponent
    ]
})

export class ProcurementTenderAddSummaryModule { }
