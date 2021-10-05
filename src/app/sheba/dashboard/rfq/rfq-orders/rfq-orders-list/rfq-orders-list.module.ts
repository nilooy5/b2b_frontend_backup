import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RfqOrdersListComponent} from './rfq-orders-list.component';
import {RfqOrdersListTableComponent} from './rfq-orders-list-table/rfq-orders-list-table.component';
import {RfqOrdersListFilterComponent} from './rfq-orders-list-filter/rfq-orders-list-filter.component';
import {DateRangePickerModule} from '../../../../../modules/date-range-picker/date-range-picker.module';
import {RouterModule} from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MaterialDateRangePickerModule} from '../../../../../modules/material-date-range-picker/material-date-range-picker.module';
import {RfqOrdersListEmptyComponent} from './rfq-orders-list-empty/rfq-orders-list-empty.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        RfqOrdersListComponent,
        RfqOrdersListTableComponent,
        RfqOrdersListFilterComponent,
        RfqOrdersListEmptyComponent
    ],
    imports: [
        CommonModule,
        DateRangePickerModule,
        RouterModule,
        MatTableModule,
        MaterialDateRangePickerModule,
        MatButtonModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})

export class RfqOrdersListModule {
}
