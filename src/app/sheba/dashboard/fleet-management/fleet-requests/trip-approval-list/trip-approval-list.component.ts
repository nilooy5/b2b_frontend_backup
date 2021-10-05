import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FleetService} from '../../../../../services/fleet.service';
import {StorageService} from '../../../../../services/storage.service';
import {DashboardResolveService} from '../../../dashboard-resolve.service';
import {TableEssentials, TableEvents} from '../../../../../modules/extras/general';
import {MatTableDataSource} from '@angular/material';
import {catchError, debounceTime, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';

@Component({
    selector: 'app-trip-approval-list',
    templateUrl: './trip-approval-list.component.html',
    styleUrls: ['./trip-approval-list.component.scss']
})
export class TripApprovalListComponent implements OnInit {
    userAccess = true;
    open: boolean = true;
    searchQuery = '';
    requests: any[];
    dataSource: MatTableDataSource<any>;
    displayColumns = ['dropoff_address', 'created_on', 'requested_on', 'vehicle_type', 'status', 'actions'];

    constructor(
        private route: ActivatedRoute,
        private service: FleetService,
        private storage: StorageService,
        private http: ShebaHttpService,
        private dashboardService: DashboardResolveService,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.requests);
        });

        this.dashboardService.DashboardBehavior.subscribe(res => {
            this.open = res.open;
        });
    }

    setData(data) {
        this.requests = data as any[];
        this.requests = this.requests.map(item => {
            let _data = item.business_trip_request;
            _data['approval_id'] = item.id;
            _data['status'] = item.status;
            return _data;
        });
        this.dataSource = new MatTableDataSource(this.requests);
    }

    ngOnInit() {
    }

    search(key) {
        let result = [];

        result = this.requests.filter((item) => item.dropoff_address ? item.dropoff_address.toLowerCase().includes(key.toLowerCase()) : false);

        this.dataSource = new MatTableDataSource(result);
    }

    filterData(filter) {
        const filterParams = {
            limit: '10',
            offset: filter.page.toString()
        };
        if (filter.status) {
            filterParams['status'] = filter.status;
        }
        if (filter.vehicle) {
            filterParams['vehicle_type'] = filter.vehicle;
        }

        this.getTripApprovalList(filterParams);
    }

    getTripApprovalList(filters) {
        return this.http.get('v2/members/' + this.storage.user.member_id + '/trip-request-approval',
            {
                params: filters,
                responseType: 'text'
            })
            .toPromise()
            .then(res => {
                res = JSON.parse(res)
                this.setData(res.code === 200 ? res.request_approvals : []);
            });
    }
}
