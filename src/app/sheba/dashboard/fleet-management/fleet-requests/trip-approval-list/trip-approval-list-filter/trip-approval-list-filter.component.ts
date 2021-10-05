import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ApprovalRequestStatus, VehicleTypes} from '../../../../../../helpers/constants';

@Component({
    selector: 'app-trip-approval-list-filter',
    templateUrl: './trip-approval-list-filter.component.html',
    styleUrls: ['./trip-approval-list-filter.component.scss']
})
export class TripApprovalListFilterComponent implements OnInit {

    filter: any;
    vehicles: any[] = VehicleTypes;
    statuses = ApprovalRequestStatus;
    @Output() filterEmitter: EventEmitter<any> = new EventEmitter();
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    @Output() sortEmitter: EventEmitter<any> = new EventEmitter();

    constructor(
        private router: Router,
    ) {
        this.filter = {
            status: null,
            vehicle: null,
            page: 0
        };
    }

    ngOnInit() {
    }

    selectVehicle(vehicle) {
        this.filter.vehicle = vehicle.value;
        this.filterEmitter.emit(this.filter);
    }

    selectStatus(status) {
        this.filter.status = status.value;
        this.filterEmitter.emit(this.filter);
    }

    search(key) {
        this.searchEmitter.emit(key.target.value);
    }

    selectSort(sort) {
        this.sortEmitter.emit(sort.target.value);
    }

    addItem() {
        this.router.navigate(['/', 'dashboard', 'co-workers', 'co-workers', 'add']).catch(err => {
            console.log(err);
        });
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
