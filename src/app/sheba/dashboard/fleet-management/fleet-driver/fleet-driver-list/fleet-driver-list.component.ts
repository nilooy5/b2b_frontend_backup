import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material";
import {appConfig} from "../../../../../config/app.config";
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-fleet-driver-list',
    templateUrl: './fleet-driver-list.component.html',
    styleUrls: ['./fleet-driver-list.component.scss']
})
export class FleetDriverListComponent implements OnInit {
    dataSource: MatTableDataSource<any>;
    displayColumns = ['name', 'status', 'phone', 'vehicle_type', 'car', 'actions'];
    drivers: any[] = [];
    appConfig = appConfig;
    search: string;
    departments: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    setData(data: any) {
        this.drivers = data.drivers;
        this.departments = data.departments;
        this.dataSource = new MatTableDataSource(this.drivers);
    }

    ngOnInit() {
    }

    filterDriver(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };
        if (filter.status) { filterParams['status'] = filter.status; }
        if (filter.type) { filterParams['type'] = filter.type; }

        this.getFilteredDriver(filterParams);
    }

    getFilteredDriver(filters) {
        this.http.get('v2/members/' + this.storage.user.member_id + '/drivers',
            {
                params: filters,
                responseType: 'text'
            }
        ).toPromise().then(res => {
            this.setData({
                drivers: JSON.parse(res).driver_lists || []
            });
        });
    }

    searchDrivers(key) {
        let result = [];

        result = this.drivers.filter((driver) => driver.name ? driver.name.toLowerCase().includes(key.toLowerCase()) : false);

        this.dataSource = new MatTableDataSource(result);
    }

    sortDrivers(sort) {
        if (sort) {
            this.drivers = this.drivers.reverse();
            this.dataSource = new MatTableDataSource(this.drivers);
        }
    }

    driverDueStatus(data) {
        return data === 'Due Soon' ? 'due-soon' : 'overdue';
    }

    driverDueStatusDot(data) {
        return data === 'Due Soon' ? 'due-soon' : 'overdue';
    }
}
