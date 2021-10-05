import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-fleet-issue-list-filter',
    templateUrl: './fleet-issue-list-filter.component.html',
    styleUrls: ['./fleet-issue-list-filter.component.scss']
})
export class FleetIssueListFilterComponent implements OnInit {

    filter: any;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter<any> = new EventEmitter();

    constructor(
        private router: Router,
    ) {
        this.filter = {
            status: null,
            type: null,
            page: 0
        };
    }

    ngOnInit() {
    }

    selectStatus(status) {
        this.filter.status = status.target.value;
        this.filterEmitter.emit(this.filter);
    }

    selectVehicle(vehicle) {
        this.filter.type = vehicle.target.value;
        this.filterEmitter.emit(this.filter);
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

    selectSort(sort) {
        this.sortEmitter.emit(sort.target.value);
    }

}
