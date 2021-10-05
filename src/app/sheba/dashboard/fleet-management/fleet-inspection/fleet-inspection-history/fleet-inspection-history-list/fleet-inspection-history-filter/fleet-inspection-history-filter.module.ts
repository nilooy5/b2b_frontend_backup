import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FleetInspectionHistoryFilterComponent} from './fleet-inspection-history-filter.component';
import {DateRangePickerModule} from '../../../../../../../modules/date-range-picker/date-range-picker.module';

@NgModule({
    declarations: [
        FleetInspectionHistoryFilterComponent
    ],
    imports: [
        CommonModule,
        DateRangePickerModule
    ],
    exports: [
        FleetInspectionHistoryFilterComponent
    ]
})
export class FleetInspectionHistoryFilterModule { }
