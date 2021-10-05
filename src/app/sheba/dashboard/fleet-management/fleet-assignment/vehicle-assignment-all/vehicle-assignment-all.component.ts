import {Component, OnInit} from '@angular/core';
import {FleetService} from "../../../../../services/fleet.service";
import {formatDateTime} from "../../../../../helpers/functions";
import {addDays, endOfDay, startOfDay, startOfMonth} from "date-fns";
import {TripsDetails} from "../../../../../types/fleet";
import {appConfig} from "../../../../../config/app.config";
import {VehicleAssignmentFilter} from "./vehicle-assignments-filter/vehicle-assignments-filter.component";
import {catchError, debounceTime, tap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
    selector: 'app-vehicle-assignment-all',
    templateUrl: './vehicle-assignment-all.component.html',
    styleUrls: ['./vehicle-assignment-all.component.scss']
})
export class VehicleAssignmentAllComponent implements OnInit {
    startDate = new Date();
    viewType: 'month' | 'week' | 'day' = 'month';
    groupType: 'vehicle' | 'driver' | 'employee' = 'vehicle';
    groupText = {vehicle: 'Vehicles', driver: 'Drivers', employee: 'Employees'};
    page = 1;
    query: string;
    limit = 20;
    trips: TripsDetails[];
    appConfig = appConfig;
    data: TripsDetails[] = [];
    loadingData: boolean;

    constructor(
        private service: FleetService
    ) {
    }

    ngOnInit() {

    }

    loadCalendar(event?: VehicleAssignmentFilter) {
        if (event) {
            this.groupType = event.filter;
            this.startDate = event.startDate;
            this.viewType = event.viewType;
            this.setTrips().then(res => {
                this.trips = res;
                if (event.query && event.query !== '') {
                    this.data = this.filterData(event.filter.toLowerCase())
                } else {
                    this.data = res;
                }
            });

        } else {
            this.startDate = startOfMonth(this.startDate);
            this.setTrips().then(res => {
                this.trips = res;
                this.data = res;
            });
        }
    }

    filterData(query) {
        return this.trips.filter(item => {
            return item.name.toLowerCase().indexOf(query) >= 0;
        });
    }

    setTrips() {
        this.loadingData = true;
        return this.service.getBusinessTrips(this.page, this.limit, this.generateFilter())
            .pipe(debounceTime(1000), tap(_ => {
                this.loadingData = false;
            }), catchError(_ => {
                this.loadingData = false;
                return of([]);
            })).toPromise();
    }

    generateFilter() {
        return {
            filter: this.groupType,
            from: formatDateTime(startOfDay(this.startDate)),
            to: formatDateTime(this.getEndDate())
        }
    }

    getEndDate() {
        switch (this.viewType) {
            case "day":
                return endOfDay(this.startDate);
            case "month":
                return endOfDay(addDays(this.startDate, 30));
            case "week":
                return endOfDay(addDays(this.startDate, 6));
        }
    }

}
