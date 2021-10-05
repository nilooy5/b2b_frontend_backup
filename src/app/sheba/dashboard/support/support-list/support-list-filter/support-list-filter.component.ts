import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as dateFns from 'date-fns';

@Component({
    selector: 'app-support-list-filter',
    templateUrl: './support-list-filter.component.html',
    styleUrls: ['./support-list-filter.component.scss'],
    providers: [DatePipe]
})
export class SupportListFilterComponent implements OnInit {

    statusOpen;
    @Input() supportStatus: any = null;
    @Input() totalSupportCount;
    @Input() limit;
    @Output() filterEmitter = new EventEmitter<any>();
    @Output() searchInputEmitter: EventEmitter<any> = new EventEmitter();

    dateRange;
    public filter: any;

    constructor(private datePipe: DatePipe) {
        this.filter = {
            status: null,
            start_date: null,
            end_date: null,
            page: 0
        };
        let today = dateFns.startOfDay(new Date());
        this.dateRange = {
            from: dateFns.startOfYear(today),
            to: dateFns.endOfDay(today)
        };
    }

    ngOnInit() { }

    selectStatus(e) {
        this.filter.status = e.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    OnRangeSelected({from, to}) {
        this.filter.start_date = this.datePipe.transform(from, 'yyyy-MM-dd');
        this.filter.end_date = this.datePipe.transform(to, 'yyyy-MM-dd');
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    search(e) {
        this.searchInputEmitter.emit(e.target.value);
    }

    isPreviousPageUnavailable() {
        return this.filter.page <= 1;
    }

    isNextPageAvailable() {
        return this.totalSupportCount > this.filter.page + this.limit;
    }

    isNextPageUnavailable() {
        return !this.isNextPageAvailable();
    }

    previousPage() {
        if (this.isPreviousPageUnavailable()) return;
        this.filter.page -= this.limit;
        this.filterEmitter.emit(this.filter);
    }

    nextPage() {
        if (this.isNextPageUnavailable()) return;
        this.filter.page += this.limit;
        this.filterEmitter.emit(this.filter);
    }

}
