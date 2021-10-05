import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateRangePickerComponent} from './date-range-picker.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [DateRangePickerComponent],
  declarations: [DateRangePickerComponent]
})
export class DateRangePickerModule {
}
