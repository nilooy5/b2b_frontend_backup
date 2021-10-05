import {Component, OnInit} from '@angular/core';
import {NavLink} from '../../../../types/general';
import {DashboardResolveService} from '../../dashboard-resolve.service';
import {ActivationEnd, NavigationStart, Router} from '@angular/router';

@Component({
    selector: 'app-fleet-inspection',
    templateUrl: './fleet-inspection.component.html',
    styleUrls: ['./fleet-inspection.component.scss']
})
export class FleetInspectionComponent implements OnInit {
    navLinks: NavLink[];
    open: boolean = true;
    action: { actionButtonText: string, path: string };

    constructor(
        private dashboardService: DashboardResolveService,
        private router: Router
    ) {
        this.navLinks = [
            {
                label: 'Ongoing',
                path: './ongoing',
            },
            {
                label: 'History',
                path: './history',
            },
            {
                label: 'Failed Items',
                path: './failed-item'
            },
            {
                label: 'Forms',
                path: './forms'
            }
        ];
        this.dashboardService.DashboardBehavior.subscribe(res => {
            this.open = res.open;
        });
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.action = null;
            }
            if (event instanceof ActivationEnd) {
                if (event.snapshot.data.action) {
                    this.action = event.snapshot.data.action;
                }
            }
        })
    }

    ngOnInit() {
    }

}
