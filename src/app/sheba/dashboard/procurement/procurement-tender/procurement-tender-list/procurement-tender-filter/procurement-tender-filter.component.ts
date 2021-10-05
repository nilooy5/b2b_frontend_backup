import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {IDateRange} from '../../../../../../modules/date-range-picker/date-range';

@Component({
    selector: 'app-procurement-tender-filter',
    templateUrl: './procurement-tender-filter.component.html',
    styleUrls: ['./procurement-tender-filter.component.scss']
})
export class ProcurementTenderFilterComponent implements OnInit {
    @Input() procurementStatuses: any = null;
    @Input() totalProcurementCount: number = 0;

    @Output() filterEmitter = new EventEmitter<any>();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    @Output() alphabeticFilter = new EventEmitter<any>();
    dateRange: IDateRange = {
        from: new Date((new Date()).getFullYear() + '-1-1'),
        to: new Date()
    };

    public filter: any;
    public selectedOrder = 0;

    constructor(private router: Router) {
        this.filter = {
            status: null,
            start_date: null,
            end_date: null,
            page: 0
        };
    }

    ngOnInit() {
    }

    OnRangeSelected({from, to}) {
        this.filter.start_date = this.getApiFormat(from);
        this.filter.end_date = this.getApiFormat(to);

        this.filterEmitter.emit(this.filter);
    }

    selectStatus(status) {
        this.filter.status = status.target.value;
        this.filterEmitter.emit(this.filter);
    }

    search(key) {
        this.searchEmitter.emit(key.target.value);
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

    alphabeticSort(e) {
        this.selectedOrder = e.target.value;
        this.alphabeticFilter.emit(this.selectedOrder);
    }

    getApiFormat(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }

        return [year, month, day].join('-');
    }

}
