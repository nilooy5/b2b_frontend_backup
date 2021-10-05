import {Component, OnInit} from '@angular/core';
import {TableEssentials, TableEvents} from '../../../../../modules/extras/general';
import {ActivatedRoute} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {debounceTime} from 'rxjs/operators';
import {FleetService} from '../../../../../services/fleet.service';
import {StorageService} from '../../../../../services/storage.service';
import {NavLink} from '../../../../../types/general';
import {DashboardResolveService} from '../../../dashboard-resolve.service';

@Component({
    selector: 'app-fleet-request-list',
    templateUrl: './fleet-request-list.component.html',
    styleUrls: ['./fleet-request-list.component.scss']
})
export class FleetRequestListComponent extends TableEssentials implements OnInit {
    userAccess = true;
    open: boolean = true;

    constructor(
        private route: ActivatedRoute,
        private service: FleetService,
        private storage: StorageService,
        private dashboardService: DashboardResolveService,
    ) {
        super(route, 'requests');
        this.tableEvents().subscribe((res: TableEvents) => {
            if (res.set) {
                this.setData();
            }
            if (res.load) {
                this.reloadList();
            }
        });

        this.userAccess = !!this.storage.user.is_super;

        this.dashboardService.DashboardBehavior.subscribe(res => {
            this.open = res.open;
        });
    }

    setData() {
        this.dataSource = new MatTableDataSource(this.data);
    }

    ngOnInit() {
        this.displayColumns = ['name', 'designation', 'vehicle_type', 'date', 'status', 'actions'];
    }

    reloadList() {
        this.service.vehicleRequests(this.page, this.limit, this.filter).pipe(debounceTime(5000)).toPromise().then(res => {
            this.data = res;
            this.setData();
        });
    }
}
