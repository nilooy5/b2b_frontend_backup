import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionHistoryListRoutingModule } from './inspection-history-list-routing.module';
import {InspectionHistoryListFilterModule} from './inspection-history-list-filter/inspection-history-list-filter.module';
import {InspectionHistoryListComponent} from './inspection-history-list.component';
import {MatTableModule} from '@angular/material';

@NgModule({
    declarations: [
        InspectionHistoryListComponent
    ],
    imports: [
        CommonModule,
        InspectionHistoryListRoutingModule,
        InspectionHistoryListFilterModule,
        MatTableModule,
    ]
})
export class InspectionHistoryListModule { }
