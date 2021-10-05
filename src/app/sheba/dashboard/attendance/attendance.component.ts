import { Component, OnDestroy } from '@angular/core';
import { DashboardResolveService } from '../dashboard-resolve.service';
import { DashboardSharedService } from '../../../services/dashboard-shared.service';
import { Subscription } from 'rxjs';
import { NavLink } from '../../../types/general';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.component.html',
    styleUrls: ['./attendance.component.scss']
})

export class AttendanceComponent implements OnDestroy {

    toggleSubscription: Subscription;
    isSidebarOpen = false;

    navLinks: NavLink[] = [
        {
            label: 'Daily',
            path: '/dashboard/attendance/daily'
        },
        {
            label: 'Monthly',
            path: '/dashboard/attendance/monthly'
        }
    ];


    constructor(private  dashboardService: DashboardResolveService,
                private dashboardSharedService: DashboardSharedService) {
        this.dashboardSharedService.changeRouteNavigation(true, this.navLinks);
        this.toggleSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe((res) => {
            this.isSidebarOpen = res.open;
        });
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeRouteNavigation(false);
        this.toggleSubscription.unsubscribe();
    }

}
