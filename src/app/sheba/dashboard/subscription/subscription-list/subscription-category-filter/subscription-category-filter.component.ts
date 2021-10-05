import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from "../../../../../models/pagination";

@Component({
    selector: 'app-subscription-category-filter',
    templateUrl: './subscription-category-filter.component.html',
    styleUrls: ['./subscription-category-filter.component.scss']
})
export class SubscriptionCategoryFilterComponent implements OnInit {
    filters: any;
    @Input() subscriptions_categories: any = null;
    @Input() totalSubscription: number = 0;
    @Output() filter = new EventEmitter<any>();
    @Output() search = new EventEmitter<any>();
    @Output() alphabeticFilter = new EventEmitter<any>();
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    pagination: Pagination;

    public selectedName = 0;
    public searchKey = '';
    public selectedCategory = 0;

    constructor(private router: Router) {
        this.filters = {
            page: 0
        };
    }

    @Input() set filteredSubscriptions(value: Array<any>) {
        this.pagination = new Pagination(value.length);
    }

    ngOnInit() {
    }

    selectCategory(e) {
        this.selectedCategory = e.target.value;
        this.filter.emit(this.selectedCategory);
    }

    onChange(e) {
        this.searchKey = e.target.value;
        this.search.emit(this.searchKey);
    }

    sortByName(e) {
        this.selectedName = e.target.value;
        this.alphabeticFilter.emit(this.selectedName);
    }

    nextPage() {
        this.filters.page = this.filters.page += 10;
        this.pagination.next();
        this.filterEmitter.emit(this.filters);
    }

    previousPage() {
        if (this.filters.page > 1) {
            this.filters.page =  this.filters.page -= 10;
            this.pagination.previous();
            this.filterEmitter.emit(this.filters);
        }
    }

}
