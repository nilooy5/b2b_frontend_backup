import { Component, OnInit } from '@angular/core';
import {DashboardResolveService} from '../../dashboard-resolve.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-fleet-requests',
    templateUrl: './fleet-requests.component.html',
    styleUrls: ['./fleet-requests.component.scss']
})
export class FleetRequestsComponent implements OnInit {
    open: boolean = true;
    tab: any;
    constructor(
        private dashboardService: DashboardResolveService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.dashboardService.DashboardBehavior.subscribe(res => {
            this.open = res.open;
        });

        router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.tab = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
            }
        });
    }

    ngOnInit() {
    }

}
