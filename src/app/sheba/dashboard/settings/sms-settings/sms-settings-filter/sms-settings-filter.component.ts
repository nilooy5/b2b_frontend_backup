import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-sms-settings-filter',
    templateUrl: './sms-settings-filter.component.html',
    styleUrls: ['./sms-settings-filter.component.scss']
})
export class SmsSettingsFilterComponent implements OnInit {
    filter: any;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter<any> = new EventEmitter();

    constructor() {
        this.filter = {
            page: 0
        };
    }

    ngOnInit() {
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
