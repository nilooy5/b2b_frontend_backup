import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavLink} from '../../../types/general';
import {DashboardResolveService} from '../dashboard-resolve.service';
import {ActivationEnd, NavigationStart, Router} from '@angular/router';
import {DashboardSharedService} from '../../../services/dashboard-shared.service';

@Component({
    selector: 'app-leave',
    templateUrl: './leave.component.html',
    styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnDestroy {

    navLinks: NavLink[];
    open = true;
    action: { actionButtonText: string, path: string };

    settingsTitle = 'Leave Settings';
    settingsItems = [
        {
            title: 'Leave Types',
            iconName: 'settings',
            path: '/dashboard/settings/leave/type'
        },
        {
            title: 'Fiscal Year',
            iconName: 'check_circle',
            path: '/dashboard/settings/leave/others'
        },
        {
            title: 'Sandwich Leave',
            iconName: 'date_range',
            path: '/dashboard/settings/leave/others'
        }
    ];

    constructor(private router: Router,
                private dashboardSharedService: DashboardSharedService,
                private  dashboardService: DashboardResolveService) {
        this.navLinks = [
            {
                label: 'Leave Requests',
                path: './requests'
            },
            {
                label: 'Leave Balance',
                path: './balance'
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
        });

        this.dashboardSharedService.changeFeatureSettings(true, this.settingsTitle, this.settingsItems);
    }
    

    ngOnDestroy() {
        this.dashboardSharedService.changeFeatureSettings(false);
    }

}
