import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {VehicleTypes} from "../../../../../../helpers/constants";
import {IDateRange} from "../../../../../../modules/date-range-picker/date-range";
import {formatDateTime} from "../../../../../../helpers/functions";
import {FleetService} from "../../../../../../services/fleet.service";
import {Vehicle} from "../../../../../../types/fleet";

@Component({
    selector: 'app-assignment-list-filter',
    templateUrl: './assignment-list-filter.component.html',
    styleUrls: ['./assignment-list-filter.component.scss']
})

export class AssignmentListFilterComponent implements OnInit {
    filter = {
        status: null,
        vehicle_id: null,
        from: new Date(),
        to: new Date(),
        sort_by: null
    };
    vehicles: Vehicle[];
    dateRange: IDateRange = {
        from: new Date((new Date()).getFullYear() + '-1-1'),
        to: new Date()
    };
    @Output() OnFilterEvent: EventEmitter<any> = new EventEmitter();

    constructor(
        private service: FleetService
    ) {
        this.service.getVehicles().toPromise().then(res => {
            if (res && res.length) {
                this.vehicles = res;
            }
        })
    }

    ngOnInit() {
    }

    OnRangeSelected(event) {
        this.filter.from = event.from;
        this.filter.to = event.to;
        this.FilterItems();
    }

    FilterItems() {
        let data: any = {};
        Object.assign(data, this.filter);
        if (data.from) data.from = formatDateTime(data.from);
        if (data.to) data.to = formatDateTime(data.to);
        this.OnFilterEvent.emit(data);
    }

}
