import {Component, EventEmitter, OnInit, Output} from '@angular/core';

export interface VehicleAssignmentFilter {
    startDate: Date,
    viewType: 'month' | 'day' | 'week',
    filter: 'driver' | 'vehicle' | 'employee',
    query: string,
}

@Component({
    selector: 'app-vehicle-assignments-filter',
    templateUrl: './vehicle-assignments-filter.component.html',
    styleUrls: ['./vehicle-assignments-filter.component.scss']
})
export class VehicleAssignmentsFilterComponent implements OnInit {
    viewTypes = [
        {label: 'Month', value: 'month'},
        {label: 'Week', value: 'week'},
        {label: 'Day', value: 'day'}
    ];

    groups = [
        {label: 'Vehicle', value: 'vehicle'},
        {label: 'Driver', value: 'driver'},
        {label: 'Employee', value: 'employee'}
    ];
    filter: VehicleAssignmentFilter = {
        startDate: new Date(),
        viewType: 'month',
        filter: 'vehicle',
        query: ''
    };
    @Output() OnFilterEvent: EventEmitter<VehicleAssignmentFilter> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        this.emitFilter();
    }

    emitFilter() {
        this.OnFilterEvent.emit(this.filter);
    }

}
