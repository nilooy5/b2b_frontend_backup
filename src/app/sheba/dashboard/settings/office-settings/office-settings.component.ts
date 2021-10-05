import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardSharedService } from '../../../../services/dashboard-shared.service';
import { DashboardResolveService } from '../../dashboard-resolve.service';
import { StorageService } from '../../../../services/storage.service';
import { NavLink } from '../../../../types/general';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-office-settings',
    templateUrl: './office-settings.component.html',
    styleUrls: ['./office-settings.component.scss']
})

export class OfficeSettingsComponent implements OnInit, OnDestroy {


    toggleSubscription: Subscription;
    isSidebarOpen = false;

    navLinks: NavLink[] = [
        {
            label: 'Office Day & Time',
            path: '/dashboard/settings/office/day-time'
        },
        {
            label: 'Attendance',
            path: '/dashboard/settings/office/attendance'
        },
        {
            label: 'Holiday',
            path: '/dashboard/settings/office/holiday'
        }
    ];

    constructor(private dashboardSharedService: DashboardSharedService,
                private storage: StorageService,
                private dashboardService: DashboardResolveService) {
        this.dashboardSharedService.changeRouteNavigation(true, this.navLinks);
        this.toggleSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe((res) => {
            this.isSidebarOpen = res.open;
        });
    }

    ngOnInit() { }

    ngOnDestroy() {
        this.dashboardSharedService.changeRouteNavigation(false);
        this.toggleSubscription.unsubscribe();
    }

    redirectToHelp() {
        return environment.help_url + 'topics?type=business&type_id=' + this.storage.user.business_id;
    }
}
