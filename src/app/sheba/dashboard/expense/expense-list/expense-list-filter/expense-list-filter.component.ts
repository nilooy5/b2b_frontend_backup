import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-expense-list-filter',
    templateUrl: './expense-list-filter.component.html',
    styleUrls: ['./expense-list-filter.component.scss']
})

export class ExpenseListFilterComponent implements OnInit {

    currentMonthSelected;
    @Input() departments: any[];
    @Input() filteredEmployees: any[];
    @Input() totalExpenseCount: number;
    @Input() limit;
    @Output() filterEmitter = new EventEmitter<any>();
    @Output() alphabeticFilter = new EventEmitter<any>();
    @Output() searchInputEmitter: EventEmitter<any> = new EventEmitter();

    public filter: any;

    months: any = [
        { key: 'all', title: 'All' },
        { key: 'january', title: 'January' },
        { key: 'february', title: 'February' },
        { key: 'march', title: 'March' },
        { key: 'april', title: 'April' },
        { key: 'may', title: 'May' },
        { key: 'june', title: 'June' },
        { key: 'july', title: 'July' },
        { key: 'august', title: 'August' },
        { key: 'september', title: 'September' },
        { key: 'october', title: 'October' },
        { key: 'november', title: 'November' },
        { key: 'december', title: 'December' }
    ];

    constructor(private datePipe: DatePipe) {

        this.currentMonthSelected = moment().startOf('month').format('MMMM').toLowerCase();

        this.filter = {
            department: null,
            employee: null,
            start_date: null,
            end_date: null,
            key: null,
            page: 0
        };
    }

    ngOnInit() { }

    selectMonth(event) {
        if (event.target.value !== 'all') {
            this.filter.key = '';
            const start_date = moment().month(event.target.value).startOf('month').format('YYYY-MM-DD');
            const end_date = moment().month(event.target.value).endOf('month').format('YYYY-MM-DD');

            this.filter.start_date = start_date;
            this.filter.end_date = end_date;
            this.filter.page = 0;
            this.filterEmitter.emit(this.filter);
        } else {
            this.filter.key = 'all';
            this.filter.page = 0;
            this.filterEmitter.emit(this.filter);
        }


    }

    selectDepartment(event) {
        this.filter.department = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    selectEmployee(event) {
        this.filter.employee = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    search(event) {
        this.searchInputEmitter.emit(event.target.value);
    }

    alphabeticSort(event) {
        this.alphabeticFilter.emit(event.target.value);
    }

    previousPage() {
        if (this.isPreviousPageUnavailable()) { return; }
        this.filter.page -= this.limit;
        this.filterEmitter.emit(this.filter);
    }
    nextPage() {
        if (this.isNextPageUnavailable()) { return; }
        this.filter.page += this.limit;
        this.filterEmitter.emit(this.filter);
    }
    isPreviousPageUnavailable() {
        return this.filter.page <= 1;
    }
    isNextPageAvailable() {
        return this.totalExpenseCount > this.filter.page + this.limit;
    }
    isNextPageUnavailable() {
        return !this.isNextPageAvailable();
    }

}
