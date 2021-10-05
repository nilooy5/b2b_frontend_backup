import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {IDateRange} from '../../../../../../../modules/date-range-picker/date-range';

@Component({
    selector: 'app-fleet-inspection-history-filter',
    templateUrl: './fleet-inspection-history-filter.component.html',
    styleUrls: ['./fleet-inspection-history-filter.component.scss']
})
export class FleetInspectionHistoryFilterComponent implements OnInit {
    filter: any;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter<any> = new EventEmitter();
    @Input() info: any;
    @Input() forms: any[];
    dateRange: IDateRange = {
        from: new Date((new Date()).getFullYear() + '-1-1'),
        to: new Date()
    };

    constructor(
        private router: Router,
    ) {
        this.filter = {
            status: null,
            submission: null,
            form: null,
            start_date: null,
            end_date: null,
            page: 0
        };
    }

    ngOnInit() {
        console.log(this.forms);
    }

    OnRangeSelected({from, to}) {
        this.filter.start_date = this.getApiFormat(from);
        this.filter.end_date = this.getApiFormat(to);

        this.filterEmitter.emit(this.filter);
    }

    selectForm(form) {
        this.filter.form = form.target.value;
        this.filterEmitter.emit(this.filter);
    }

    selectSubmission(sub) {
        this.filter.submission = sub.target.value;
        this.filterEmitter.emit(this.filter);
    }

    selectSort(sort) {
        this.sortEmitter.emit(sort.target.value);
    }

    addItem() {
        console.log(123);
        // this.router.navigate(['/', 'dashboard', 'fleet-management', 'vehicle', 'add']).catch(err => {
        //     console.log(err);
        // });
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
