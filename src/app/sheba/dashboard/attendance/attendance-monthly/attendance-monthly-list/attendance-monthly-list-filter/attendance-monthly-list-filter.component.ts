import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {StorageService} from '../../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {environment} from '../../../../../../../environments/environment';

@Component({
    selector: 'app-attendance-monthly-list-filter',
    templateUrl: './attendance-monthly-list-filter.component.html',
    styleUrls: ['./attendance-monthly-list-filter.component.scss'],
    providers: [DatePipe]
})
export class AttendanceMonthlyListFilterComponent implements OnInit, OnChanges {

    @Input () departments: any[];
    @Input () filteredAttendances: any[];
    @Input () totalAttendancesCount: number;
    @Input () limit;
    @Input() dataOffset: number;
    @Input() currentLength: number;
    @Input() sort: {name: string, type: string};

    @Output () filterEmitter = new EventEmitter<any>();
    @Output () alphabeticFilter = new EventEmitter<any>();
    @Output () searchInputEmitter: EventEmitter<any> = new EventEmitter();

    public filter: any;
    currentMonth: any;

    months: any = [
        { key: '01', title: 'January' },
        { key: '02', title: 'February' },
        { key: '03', title: 'March' },
        { key: '04', title: 'April' },
        { key: '05', title: 'May' },
        { key: '06', title: 'June' },
        { key: '07', title: 'July' },
        { key: '08', title: 'August' },
        { key: '09', title: 'September' },
        { key: '10', title: 'October' },
        { key: '11', title: 'November' },
        { key: '12', title: 'December' },
    ];

    constructor(private  datePipe: DatePipe,
                private storage: StorageService,
                private http: ShebaHttpService) {
        this.filter = {
            department: null,
            employee: null,
            month: null,
            search: null,
            sort_column: null,
            sort_type: null,
            page: 0
        };
        this.currentMonth = this.getCurrentMonthNumber();
        console.log(this.currentMonth);
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        // console.log(changes);
        if (changes.sort && changes.sort.currentValue !== undefined) {
            this.sortTable(changes.sort.currentValue.type, changes.sort.currentValue.name);
        }
    }

    sortTable(currentSortType, currentSortColumn) {
        this.filter.sort_type = currentSortType;
        this.filter.sort_column = currentSortColumn;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    selectMonth(event) {
        // if (event.target.value !== '') {
        //     const month = moment().month(event.target.value).startOf('month').format('MM');
        //     console.log(month);
        console.log(event.target.value);
            // this.filter.month =  month;
            // this.currentMonth = month;
        this.filter.month = event.target.value;
        this.currentMonth = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
        // } else {
        //     this.filter.month = '';
        //     this.filter.page = 0;
        //     this.filterEmitter.emit(this.filter);
        // }
    }

    getCurrentMonthNumber() {
        const d = new Date();
        const n = d.getMonth() + 1;
        if (n < 10) {
            return '0' + n.toString();
        } else {
            return n.toString();
        }
    }

    selectDepartment(event) {
        this.filter.department = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    selectEmployee(event) {
        this.filter.employee = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    // search(event) {
    //     this.searchInputEmitter.emit(event.target.value);
    // }

    search(event) {
        this.filter.search = event.target.value;
        this.filter.page = 0;
        this.filterEmitter.emit(this.filter);
    }

    alphabeticSort(event) {
        this.alphabeticFilter.emit(event.target.value);
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
        return this.totalAttendancesCount > this.filter.page + this.limit;
    }

    downloadReport() {
        return environment.api_url + 'v2/businesses/' + this.storage.user.business_id
            + '/attendances/monthly?month=' + this.currentMonth + '&file=excel&token=' + this.storage.user.token;
    }

}
