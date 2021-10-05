import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-rfq-orders-list-filter',
    templateUrl: './rfq-orders-list-filter.component.html',
    styleUrls: ['./rfq-orders-list-filter.component.scss'],
    providers: [DatePipe]
})
export class RfqOrdersListFilterComponent implements OnInit, OnChanges {

    @Input() tenderOrderStatuses: any = null;
    @Input() totalOrdersCount: number;
    @Input() sortColumn: {name: string, type: string};
    @Input() limit;
    @Input() dataOffset: number;
    @Input() currentLength: number;

    @Output() filterEmitter = new EventEmitter<any>();
    @Output() alphabeticFilter = new EventEmitter<any>();

    public filter: any;
    statusGroup = new FormGroup({
        status: new FormControl()
    });

    dateRange;
    initialDateRange = {
        startDate: moment().subtract(1, 'months'),
        endDate: moment()
    };

    constructor(public datepipe: DatePipe) {
        this.filter = {
            status: null,
            start_date: null,
            end_date: null,
            page: 0,
            search: null,
            sort_column: null,
            sort_type: null
        };
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.sortColumn && changes.sortColumn.currentValue !== undefined) {
            this.sortTable(changes.sortColumn.currentValue.type, changes.sortColumn.currentValue.name);
        }
    }


    sortTable(currentSortType, currentSortColumn) {
        this.filter.sort_type = currentSortType;
        this.filter.sort_column = currentSortColumn;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    selectStatus(e) {
        this.filter.status = e.value;
        this.filterEmitter.emit(this.filter);
    }

    search(e) {
        this.filter.search = e.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    OnRangeSelected(event: any) {
        this.filter.start_date = moment(event.startDate).format('YYYY-MM-DD');
        this.filter.end_date = moment(event.endDate).format('YYYY-MM-DD');
        this.filterEmitter.emit(this.filter);
    }

    alphabeticSort(e) {
        this.alphabeticFilter.emit(e.target.value);
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
        return this.totalOrdersCount > this.filter.page + this.limit;
    }

}
