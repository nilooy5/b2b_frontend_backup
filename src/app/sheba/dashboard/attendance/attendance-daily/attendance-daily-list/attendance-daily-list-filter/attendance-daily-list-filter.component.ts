import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

@Component({
    selector: 'app-attendance-daily-list-filter',
    templateUrl: './attendance-daily-list-filter.component.html',
    styleUrls: ['./attendance-daily-list-filter.component.scss'],
    providers: [DatePipe]
})
export class AttendanceDailyListFilterComponent implements OnInit, OnChanges {

    maxDate = new Date();

    @Input() departments: any[];
    @Input() filteredAttendances: any[];
    @Input() totalAttendancesCount: number;
    @Input() limit;
    @Input() dataOffset: number;
    @Input() currentLength: number;
    @Input() sort: { name: string, type: string };

    @Output() filterEmitter = new EventEmitter<any>();
    @Output() alphabeticFilter = new EventEmitter<any>();
    @Output() searchInputEmitter: EventEmitter<any> = new EventEmitter();

    public filter: any;

    statuses: any = [
        {key: '', title: 'All'},
        {key: 'on_time', title: 'On Time'},
        {key: 'late', title: 'Late'},
        {key: 'left_early', title: 'Left Early'},
        {key: 'absent', title: 'Absent'},
    ];
    check_in_statuses: any = [
        {key: 'all', title: 'All'},
        {key: 'on_time', title: 'On Time'},
        {key: 'late', title: 'Late'},
    ];
    check_out_statuses: any = [
        {key: 'all', title: 'All'},
        {key: 'left_timely', title: 'Left Timely'},
        {key: 'left_early', title: 'Left Early'},
    ];

    constructor(private datePipe: DatePipe) {
        this.filter = {
            department: null,
            // employee: null,
            // status: null,
            search: null,
            check_in_status: null,
            check_out_status: null,
            sort_column: null,
            sort_type: null,
            page: 0,
            date: null
        };
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        // console.log(changes);
        if (changes.sort && changes.sort.currentValue !== undefined) {
            this.sortTable(changes.sort.currentValue.type, changes.sort.currentValue.name);
        }
    }


    sortTable(currentSortType, currentSortColumn) {
        this.filter.sort_type = currentSortType;
        this.filter.sort_column = currentSortColumn;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }


    selectDate(date) {
        if (date.value !== '') {
            this.filter.date = date.value.format('YYYY-MM-DD');
            this.filter.page = 0;
            this.filterEmitter.emit(this.filter);
        } else {
            this.filter.date = '';
            this.filter.page = 0;
            this.filterEmitter.emit(this.filter);

        }
    }

    // selectStatus(event) {
    //     if (event.target.value !== '') {
    //         this.filter.status = event.target.value;
    //         this.filter.page = 0;
    //         this.filterEmitter.emit(this.filter);
    //         console.log(this.filter.status);
    //     }
    // }

    selectCheckInStatus(event) {
        this.filter.check_in_status = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    selectCheckOutStatus(event) {
        this.filter.check_out_status = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }


    selectDepartment(event) {
        this.filter.department = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    // search(event) {
    //     this.searchInputEmitter.emit(event.target.value);
    // }

    search(event) {
        this.filter.search = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    alphabeticSort(event) {
        this.alphabeticFilter.emit(event.target.value);
    }

    previousPage() {
        if (this.isPreviousPageUnavailable()) {
            return;
        }
        this.filter.page -= this.limit;
        this.filterEmitter.emit(this.filter);
    }

    nextPage() {
        if (this.isNextPageUnavailable()) {
            return;
        }
        this.filter.page += this.limit;
        this.filterEmitter.emit(this.filter);
    }

    isPreviousPageUnavailable() {
        return this.filter.page <= 1;
    }

    isNextPageUnavailable() {
        return !this.isNextPageAvailable();
    }

    isNextPageAvailable() {
        return this.totalAttendancesCount > this.filter.page + this.limit;
    }

}
