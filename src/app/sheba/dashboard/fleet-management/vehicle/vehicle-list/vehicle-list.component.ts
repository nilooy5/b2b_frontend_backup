import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-vehicle-list',
    templateUrl: './vehicle-list.component.html',
    styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
    vehicles: any[] = [];
    search: string;
    dataSource: MatTableDataSource<any>;
    displayColumns = ['vehicle_model', 'status', 'vehicle_type', 'owner_type', 'assigned_to', 'current_driver', 'actions'];
    departments: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.vehicles);
            this.departments = res.departments;
        });
    }

    ngOnInit() {
    }

    setData(data) {
        this.vehicles = data as any[];
        this.dataSource = new MatTableDataSource(this.vehicles);
    }

    filterVehicles(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };
        if (filter.status) {
            filterParams['status'] = filter.status;
        }
        if (filter.type) {
            filterParams['type'] = filter.type;
        }
        if (filter.department) {
            filterParams['department'] = filter.department;
        }
        if (filter.owner_type) {
            filterParams['owner_type'] = filter.owner_type;
        }


        this.getFilteredVehicles(filterParams);
    }

    searchVehicles(key) {
        let result = [];

        result = this.vehicles.filter((vehicle) => vehicle.vehicle_model ? vehicle.vehicle_model.toLowerCase().includes(key.toLowerCase()) : false);

        this.dataSource = new MatTableDataSource(result);
    }

    getFilteredVehicles(filters) {
        this.http.get('v2/members/' + this.storage.user.member_id + '/vehicles',
            {
                params: filters,
                responseType: 'text'
            }
        ).toPromise().then(res => {
            this.setData(JSON.parse(res).vehicle_lists || []);
        });
    }

    sortVehicles(sort) {
        if (sort) {
            this.vehicles = this.vehicles.reverse();
            this.dataSource = new MatTableDataSource(this.vehicles);
        }
    }

    vehicleDueStatus(data) {
        return data === 'Due Soon' ? 'due-soon' : 'overdue';
    }

    vehicleDueStatusDot(data) {
        return data === 'Due Soon' ? 'due-soon' : 'overdue';
    }

}
