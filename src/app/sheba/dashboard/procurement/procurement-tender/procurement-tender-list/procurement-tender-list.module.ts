import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderListRoutingModule } from './procurement-tender-list-routing.module';
import {ProcurementTenderListComponent} from './procurement-tender-list.component';
import {MatTableModule, MatTabsModule} from '@angular/material';
import { ProcurementTenderFilterComponent } from './procurement-tender-filter/procurement-tender-filter.component';
import {DateRangePickerModule} from '../../../../../modules/date-range-picker/date-range-picker.module';

@NgModule({
    declarations: [
        ProcurementTenderListComponent,
        ProcurementTenderFilterComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderListRoutingModule,
        MatTabsModule,
        MatTableModule,
        DateRangePickerModule,
    ],
    exports: [
        ProcurementTenderListComponent
    ]
})
export class ProcurementTenderListModule { }
