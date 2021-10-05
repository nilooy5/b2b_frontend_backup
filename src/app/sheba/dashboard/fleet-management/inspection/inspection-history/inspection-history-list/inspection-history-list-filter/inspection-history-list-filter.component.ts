import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-inspection-history-list-filter',
    templateUrl: './inspection-history-list-filter.component.html',
    styleUrls: ['./inspection-history-list-filter.component.scss']
})
export class InspectionHistoryListFilterComponent implements OnInit {

    filter: any;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter<any> = new EventEmitter();
    @Input() forms: any[];

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

}
