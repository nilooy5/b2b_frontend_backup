import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementOrdersListComponent } from './procurement-orders-list.component';
import { ProcurementOrdersListRoutingModule } from './procurement-orders-list-routing.module';
import { MatTableModule } from '@angular/material';
import { ProcurementOrdersFilterComponent } from './procurement-orders-filter/procurement-orders-filter.component';
import { DateRangePickerModule } from '../../../../../modules/date-range-picker/date-range-picker.module';

@NgModule({
    declarations: [
        ProcurementOrdersListComponent,
        ProcurementOrdersFilterComponent
    ],
    imports: [
        CommonModule,
        ProcurementOrdersListRoutingModule,
        MatTableModule,
        DateRangePickerModule
    ]
})

export class ProcurementOrdersListModule { }
