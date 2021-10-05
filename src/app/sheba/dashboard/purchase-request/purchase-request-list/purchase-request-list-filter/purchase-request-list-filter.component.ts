import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDateRange} from '../../../../../modules/date-range-picker/date-range';
import {Router} from '@angular/router';

@Component({
  selector: 'app-purchase-request-list-filter',
  templateUrl: './purchase-request-list-filter.component.html',
  styleUrls: ['./purchase-request-list-filter.component.scss']
})
export class PurchaseRequestListFilterComponent implements OnInit {
    filter: any;
    @Input() info: any;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter<any> = new EventEmitter();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    dateRange: IDateRange = {
        from: new Date((new Date()).getTime() - (60 * 60 * 24 * 7 * 1000)),
        to: new Date()
    };

    constructor(
        private router: Router,
    ) {
        this.filter = {
            start_date: null,
            end_date: null,
            page: 0,
            status: null,
        };
    }

    ngOnInit() {
    }

    OnRangeSelected({from, to}) {
        this.filter.start_date = this.getApiFormat(from);
        this.filter.end_date = this.getApiFormat(to);

        this.filterEmitter.emit(this.filter);
    }

    selectVehicle(vehicle) {
        this.filter.type = vehicle.target.value;
        this.filterEmitter.emit(this.filter);
    }

    selectStatus(status) {
        this.filter.status = status.target.value;
        this.filterEmitter.emit(this.filter);
    }

    selectSort(sort) {
        this.sortEmitter.emit(sort.target.value);
    }

    search(key) {
        this.searchEmitter.emit(key.target.value);
    }

    addItem() {
        this.router.navigate(['/', 'dashboard' , 'purchase-request', 'create']).catch(err => {
            console.log(err);
        });
    }

    nextPage() {
        this.filter.page = this.filter.page += 10;
        this.filterEmitter.emit(this.filter);
    }

    PreviousPage() {
        if (this.filter.page > 1) {
            this.filter.page =  this.filter.page -= 10;
            this.filterEmitter.emit(this.filter);
        }
    }

    getApiFormat(date) {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) { month = '0' + month; }
        if (day.length < 2) { day = '0' + day; }

        return [year, month, day].join('-');
    }

}
