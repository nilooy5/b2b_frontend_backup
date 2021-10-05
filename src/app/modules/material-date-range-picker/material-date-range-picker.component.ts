import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {DaterangepickerDirective, LocaleConfig} from 'ngx-daterangepicker-material';
import * as moment from 'moment';

@Component({
    selector: 'app-material-date-range-picker',
    templateUrl: './material-date-range-picker.component.html',
    styleUrls: ['./material-date-range-picker.component.scss']
})

export class MaterialDateRangePickerComponent implements OnChanges {

    @Input() showDropdowns = true; // Month and Year Dropdown on Calendar
    @Input() showCancelButton = true;
    @Input() autoApply = false; // Will not show Apply Button
    @Input() minimumDate;
    @Input() calendarOpeningPosition = 'right'; // 'left', 'center', 'right'
    @Input() calendarDropPosition; // 'up', 'down'
    @Input() placeholder = 'Choose Date';
    @Input() initialDateRange: { startDate?: any, endDate?: any }; // Can be null also

    @Output() selectedDateRange: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild(DaterangepickerDirective) pickerDirective: DaterangepickerDirective;

    dateRangeForm: FormGroup = new FormGroup({
        selectedDateRange: new FormControl({
            startDate: moment(),
            endDate: moment()
        })
    });

    locale: LocaleConfig = {
        format: 'DD/MM/YYYY'
    };

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.initialDateRange) {
            this.dateRangeForm.controls['selectedDateRange'].setValue(changes.initialDateRange.currentValue);
        }
    }

    onSelectDate() {
        const value = this.dateRangeForm.getRawValue().selectedDateRange;

        if (value) {
            this.selectedDateRange.emit({
                startDate: moment(value.startDate),
                endDate: moment(value.endDate)
            });
        }
    }

    openDatepicker(e) {
        // this.pickerDirective.open();
        setTimeout(() => { this.pickerDirective.open(e); });
    }

}

