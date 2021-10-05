import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-subscription-order-filter',
    templateUrl: './subscription-order-filter.component.html',
    styleUrls: ['./subscription-order-filter.component.scss']
})
export class SubscriptionOrderFilterComponent implements OnInit {
    @Input() subscriptionOrderStatuses: any = null;
    @Input() totalSubscriptionOrdersCount: number = 0;

    @Output() filterEmitter = new EventEmitter<any>();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    @Output() alphabeticFilter = new EventEmitter<any>();

    public filter: any;
    public selectedOrder = 0;

    constructor() {
        this.filter = {
            status: null,
            page: 0
        };
    }

    ngOnInit() {
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

}
