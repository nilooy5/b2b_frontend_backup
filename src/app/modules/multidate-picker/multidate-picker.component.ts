import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbDateStruct, NgbCalendar, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';
import '../../helpers/extends';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
    one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
    !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
        ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
    selector: 'app-multidate-picker',
    templateUrl: './multidate-picker.component.html',
    styleUrls: ['./multidate-picker.component.scss']
})
export class MultidatePickerComponent implements OnInit {
    hoveredDate: NgbDateStruct;

    minDate: NgbDateStruct;
    maxDate: NgbDateStruct;

    _datesSelected: NgbDateStruct[] = [];


    @Input()
    set MinDate(value: NgbDateStruct) {
        this.minDate = value;
    }
    @Input()
    set MaxDate(value: NgbDateStruct) {
        this.maxDate = value;
    }
    @Input()
    set datesSelected(value: NgbDateStruct[]) {
        this._datesSelected = value;
    }
    get datesSelected(): NgbDateStruct[] {
        return this._datesSelected ? this._datesSelected : [];
    }

    @Output() datesSelectedChange = new EventEmitter<NgbDateStruct[]>();

    constructor(
        calendar: NgbCalendar
    ) { }

    ngOnInit() {
    }

    onDateSelection(event:any, date: NgbDateStruct) {
        if(this.isDateDisabled(date)) {
            return;
        }

        event.target.parentElement.blur();
        this.addDate(date);
        this.datesSelectedChange.emit(this.datesSelected);
        return;
    }

    addDate(date: NgbDateStruct) {
        let index = this.datesSelected.findIndex(f=>f.day==date.day && f.month==date.month && f.year==date.year);
        if (index >= 0) {
            this._datesSelected.splice(index,1);
        } else {
            this._datesSelected = this._datesSelected || [];
            this._datesSelected.push(date);
        }
    }

    isDateSelected(date:NgbDateStruct) {
        return (this.datesSelected.findIndex(f=>f.day==date.day && f.month==date.month && f.year==date.year)>=0);
    }

    isHovered = date => this.minDate && !this.maxDate && this.hoveredDate && after(date, this.minDate) && before(date, this.hoveredDate);
    isInside = date => after(date, this.minDate) && before(date, this.maxDate);
    isFrom = date => equals(date, this.minDate);
    isTo = date => equals(date, this.maxDate);
    isDateAvailable = date => this.isFrom(date) || this.isInside(date) || this.isTo(date);
    isDateDisabled = date => !this.isDateAvailable(date);
}
