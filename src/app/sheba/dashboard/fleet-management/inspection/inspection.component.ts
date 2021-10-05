import {Component, OnInit} from '@angular/core';
import {NavLink} from "../../../../types/general";
import {DashboardResolveService} from "../../dashboard-resolve.service";
import {ActivationEnd, NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'app-inspection',
    templateUrl: './inspection.component.html',
    styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit {

    navLinks: NavLink[];
    open: boolean = true;
    action: { actionButtonText: string, path: string };

    constructor(
        private dashboardService: DashboardResolveService,
        private router: Router
    ) {
        this.navLinks = [
            {
                label: 'Schedule',
                path: './schedule',
            },
            {
                label: 'History',
                path: './history',
            },
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
        });
    }

    ngOnInit() {
    }

}
