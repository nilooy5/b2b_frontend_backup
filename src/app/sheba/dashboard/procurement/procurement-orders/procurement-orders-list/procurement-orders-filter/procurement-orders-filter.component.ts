import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-procurement-orders-filter',
    templateUrl: './procurement-orders-filter.component.html',
    styleUrls: ['./procurement-orders-filter.component.scss'],
    providers: [DatePipe]
})
export class ProcurementOrdersFilterComponent implements OnInit {

    @Input() rfqOrderStatus: any = null;
    @Input() totalOrdersCount: number;

    public selectedSortingOrder = 0;
    @Output() filterEmitter = new EventEmitter<any>();
    @Output() searchInputEmitter: EventEmitter<any> = new EventEmitter();
    @Output() alphabeticFilter = new EventEmitter<any>();

    public filter: any;

    procurementStatuses;
    dateRange;

    constructor(public datepipe: DatePipe) {
        this.filter = {
            status: null,
            start_date: null,
            end_date: null,
            page: 0
        };
    }

    ngOnInit() { }

    selectStatus(e) {
        this.filter.status = e.target.value;
        this.filterEmitter.emit(this.filter);
    }

    search(e) {
        this.searchInputEmitter.emit(e.target.value);
    }

    OnRangeSelected({from, to}) {
        this.filter.start_date = this.datepipe.transform(from, 'yyyy-MM-dd');
        this.filter.end_date = this.datepipe.transform(to, 'yyyy-MM-dd');
        this.filterEmitter.emit(this.filter);
    }

    alphabeticSort(e) {
        this.alphabeticFilter.emit(e.target.value);
    }

    previousPage() {
        if (this.filter.page > 1) {
            this.filter.page = this.filter.page -= 10;
            this.filterEmitter.emit(this.filter);
        }
    }

    nextPage() {
        this.filter.page = this.filter.page += 10;
        this.filterEmitter.emit(this.filter);
    }
}
