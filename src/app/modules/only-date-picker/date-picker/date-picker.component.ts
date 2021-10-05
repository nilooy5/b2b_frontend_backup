import {Component, Inject, OnInit} from '@angular/core';
import {DatePickerService} from "../date-picker.service";
import {CONTAINER_DATA} from "../../../types/general";

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
    dates: { value: number, checked: boolean, hover: boolean }[] = [];

    constructor(
        private service: DatePickerService,
        @Inject(CONTAINER_DATA) public data
    ) {
        this.setDates();
    }

    setDates() {
        for (let i = 1; i <= 31; i++) {
            this.dates.push({value: i, checked: this.data.dates && this.data.dates.indexOf(i) >= 0, hover: false});
        }
    }

    ngOnInit() {
    }

    checkDates() {
        const sDates = this.dates.filter(date => date.checked).map(item => item.value);
        this.service.Behavior.next(sDates);
    }

}
