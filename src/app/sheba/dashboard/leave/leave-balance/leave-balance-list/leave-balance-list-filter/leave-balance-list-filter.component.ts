import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
    selector: 'app-leave-balance-list-filter',
    templateUrl: './leave-balance-list-filter.component.html',
    styleUrls: ['./leave-balance-list-filter.component.scss']
})
export class LeaveBalanceListFilterComponent implements OnInit {

    @Input () departments: any[];
    @Input () total_records: number;
    @Input () limit;
    @Input() sortType: string;
    @Input() dataOffset: number;
    @Input() currentLength: number;

    @Output () filterEmitter = new EventEmitter<any>();

    public filter: any;

    constructor(private storage: StorageService) {
    }

    ngOnInit() {
        this.filter = {
            department: null,
            searchEmployee: null,
            sortByName: null,
            page: 0
        };
    }

    selectDepartment(event) {
        this.filter.department = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    // search(event) {
    //     this.filter.searchEmployee = event.target.value.toLowerCase();
    //     this.filterEmitter.emit(this.filter);
    // }

    search(input: Event) {
        const target = input.target as HTMLInputElement;
        this.filter.searchEmployee = target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    alphabeticSort(event) {
        this.filter.sortByName = event.target.value;
        this.filterEmitter.emit(this.filter);
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
    isNextPageUnavailable() {
        return !this.isNextPageAvailable();
    }
    isNextPageAvailable() {
        return this.total_records > this.filter.page + this.limit;
    }

    downloadReport() {
        return environment.api_url + 'v2/businesses/' + this.storage.user.business_id
            + '/leaves/balance/lists?file=excel&token=' + this.storage.user.token;
    }

}
