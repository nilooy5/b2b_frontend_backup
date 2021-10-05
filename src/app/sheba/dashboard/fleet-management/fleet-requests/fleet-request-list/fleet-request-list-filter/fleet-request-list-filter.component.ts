import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RequestStatus, VehicleTypes} from "../../../../../../helpers/constants";
import {formatDateTime} from "../../../../../../helpers/functions";

@Component({
    selector: 'app-fleet-request-list-filter',
    templateUrl: './fleet-request-list-filter.component.html',
    styleUrls: ['./fleet-request-list-filter.component.scss']
})
export class FleetRequestListFilterComponent implements OnInit {

    filter = {
        status: null,
        vehicle: null,
        sort_by: null
    };
    vehicleTypes = VehicleTypes;
    status = RequestStatus;
    @Output() OnFilterEvent: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }


    FilterItems() {
        let data: any = {};
        Object.assign(data, this.filter);
        if (data.start_date) data.start_date = formatDateTime(data.start_date);
        if (data.end_date) data.end_date = formatDateTime(data.end_date);
        this.OnFilterEvent.emit(data);
    }

}
