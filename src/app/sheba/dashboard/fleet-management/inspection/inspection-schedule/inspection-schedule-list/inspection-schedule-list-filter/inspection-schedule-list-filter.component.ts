import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-inspection-schedule-list-filter',
    templateUrl: './inspection-schedule-list-filter.component.html',
    styleUrls: ['./inspection-schedule-list-filter.component.scss']
})
export class InspectionScheduleListFilterComponent implements OnInit {

    filter: any;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter<any> = new EventEmitter();
    @Input() forms: any[];

    constructor(
        private router: Router,
    ) {
        this.filter = {
            type: null,
            form: null,
            page: 0
        };
    }

    ngOnInit() {
    }


    selectForm(form) {
        this.filter.form = form.target.value;
        this.filterEmitter.emit(this.filter);
    }

    selectVehicle(vehicle) {
        this.filter.type = vehicle.target.value;
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
