import {     NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRequestListFilterComponent} from './purchase-request-list-filter.component';
import {DateRangePickerModule} from '../../../../../modules/date-range-picker/date-range-picker.module';

@NgModule({
    declarations: [PurchaseRequestListFilterComponent],
    imports: [
        CommonModule,
        DateRangePickerModule
    ],
    exports: [
        PurchaseRequestListFilterComponent
    ]
})
export class PurchaseRequestListFilterModule { }
