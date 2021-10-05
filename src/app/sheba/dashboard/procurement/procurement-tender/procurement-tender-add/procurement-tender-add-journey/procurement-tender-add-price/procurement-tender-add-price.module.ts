import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderAddPriceRoutingModule } from './procurement-tender-add-price-routing.module';
import { ProcurementTenderAddPriceComponent } from './procurement-tender-add-price.component';
import { EditableTableInlineModule } from '../../../../../../../modules/editable-table-inline/editable-table-inline.module';

@NgModule({
    declarations: [
        ProcurementTenderAddPriceComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderAddPriceRoutingModule,
        EditableTableInlineModule
    ],
    exports: [
        ProcurementTenderAddPriceComponent
    ]
})
export class ProcurementTenderAddPriceModule { }
