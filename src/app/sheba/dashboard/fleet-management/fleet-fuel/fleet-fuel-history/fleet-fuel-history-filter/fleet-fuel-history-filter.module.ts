import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FleetFuelHistoryFilterComponent} from './fleet-fuel-history-filter.component';
import {DateRangePickerModule} from '../../../../../../modules/date-range-picker/date-range-picker.module';

@NgModule({
    declarations: [
        FleetFuelHistoryFilterComponent
    ],
    imports: [
        CommonModule,
        DateRangePickerModule
    ],
    exports: [
        FleetFuelHistoryFilterComponent
    ]
})
export class FleetFuelHistoryFilterModule { }
