import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InspectionHistoryListFilterComponent} from './inspection-history-list-filter.component';

@NgModule({
    declarations: [
        InspectionHistoryListFilterComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        InspectionHistoryListFilterComponent
    ]
})
export class InspectionHistoryListFilterModule { }
