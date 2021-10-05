import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-rfq-list-filter',
    templateUrl: './rfq-list-filter.component.html',
    styleUrls: ['./rfq-list-filter.component.scss']
})
export class RfqListFilterComponent implements OnInit, OnChanges {

    @Input() procurementStatuses: any = null;
    @Input() totalProcurementCount: number;
    @Input() limit;
    @Input() dataOffset: number;
    @Input() currentLength: number;
    @Input() sort: {name: string, type: string};

    @Output() filterEmitter = new EventEmitter<any>();

    public filter: any;
    public selectedOrder = 0;
    dateRange = {
        startDate: moment().subtract(1, 'month'),
        endDate: moment(),
    };

    constructor(private router: Router) {
        this.filter = {
            status: null,
            start_date: null,
            end_date: null,
            search: null,
            sort_column: null,
            sort_type: null,
            page: 0
        };
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.sort.currentValue !== undefined) {
            this.sortTable(changes.sort.currentValue.type, changes.sort.currentValue.name);
        }
    }

    sortTable(currentSortType, currentSortColumn) {
        this.filter.sort_type = currentSortType;
        this.filter.sort_column = currentSortColumn;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    selectStatus(status) {
        console.log(status.value);
        this.filter.status = status.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    search(event) {
        this.filter.search = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
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
        return this.totalProcurementCount > this.filter.page + this.limit;
    }

    handleDeliveryTimeline(event) {
        this.filter.start_date = moment(event.startDate).format('YYYY-MM-DD');
        this.filter.end_date = moment(event.endDate).format('YYYY-MM-DD');
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }
}
