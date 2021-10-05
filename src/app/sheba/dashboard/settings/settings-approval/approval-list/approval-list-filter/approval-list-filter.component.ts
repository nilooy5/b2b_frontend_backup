/* tslint:disable:no-trailing-whitespace */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {log} from "util";

@Component({
    selector: 'app-approval-list-filter',
    templateUrl: './approval-list-filter.component.html',
    styleUrls: ['./approval-list-filter.component.scss']
})

export class ApprovalListFilterComponent implements OnInit {

    @Input() types: any[];
    @Input() departments: any[];
    @Input() totalApprovalsFlowCount: number;
    @Input() limit;
    @Output() alphabeticFilter = new EventEmitter<any>();
    @Output() filterEmitter = new EventEmitter<any>();
    @Output() searchInputEmitter: EventEmitter<any> = new EventEmitter();

    public filter: any;


    months: any = [
        { key: '', title: 'All' },
        { key: 'technology', title: 'Technology' },
        { key: 'cx', title: 'CX' },
        { key: 'product', title: 'Product' }
    ];

    constructor() {
        this.filter = {
            type: null,
            department: null,
            page: 0
        };
    }

    ngOnInit() { }

    alphabeticSort(event) {
        this.alphabeticFilter.emit(event.target.value);
    }
    selectType(event) {
        this.filter.type = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }
    selectDepartment(event) {
        this.filter.department = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }
    search(event) {
        this.searchInputEmitter.emit(event.target.value);
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
        return this.totalApprovalsFlowCount > this.filter.page + this.limit;
    }
    isNextPageUnavailable() {
        return !this.isNextPageAvailable();
    }


}
