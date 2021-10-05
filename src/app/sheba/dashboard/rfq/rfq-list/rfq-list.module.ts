import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfqListComponent } from './rfq-list.component';
import {RouterModule} from '@angular/router';
import { RfqListBreadcrumbComponent } from './rfq-list-breadcrumb/rfq-list-breadcrumb.component';
import {RfqFooterHelpModule} from '../rfq-footer-help/rfq-footer-help.module';
import {MatFormFieldModule, MatSelectModule, MatTableModule} from '@angular/material';
import {RfqListFilterComponent} from './rfq-list-filter/rfq-list-filter.component';
import {MaterialDateRangePickerModule} from '../../../../modules/material-date-range-picker/material-date-range-picker.module';

@NgModule({
    declarations: [
        RfqListComponent,
        RfqListBreadcrumbComponent,
        RfqListFilterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        RfqFooterHelpModule,
        MatTableModule,
        MatFormFieldModule,
        MatSelectModule,
        MaterialDateRangePickerModule
    ]
})

export class RfqListModule { }
