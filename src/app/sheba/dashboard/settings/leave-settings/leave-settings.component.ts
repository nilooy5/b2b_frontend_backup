import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardSharedService} from '../../../../services/dashboard-shared.service';
import {NavLink} from '../../../../types/general';
import {Subscription} from 'rxjs';
import {StorageService} from '../../../../services/storage.service';
import {DashboardResolveService} from '../../dashboard-resolve.service';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-leave-settings',
    templateUrl: './leave-settings.component.html',
    styleUrls: ['./leave-settings.component.scss']
})

export class LeaveSettingsComponent implements OnDestroy {

    toggleSubscription: Subscription;
    isSidebarOpen = false;

    navLinks: NavLink[] = [
        {
            label: 'Leave Type',
            path: '/dashboard/settings/leave/type'
        },
        {
            label: 'Others',
            path: '/dashboard/settings/leave/others'
        }
    ];

    constructor(private dashboardSharedService: DashboardSharedService,
                private storage: StorageService,
                private dashboardService: DashboardResolveService) {
        this.dashboardSharedService.changeRouteNavigation(true, this.navLinks);
        this.dashboardSharedService.changeHeaderTitle('Leave Settings');
        this.toggleSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe((res) => {
            this.isSidebarOpen = res.open;
        });
    }

    redirectToHelp() {
        return environment.help_url + 'topics?type=business&type_id=' + this.storage.user.business_id;
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeRouteNavigation(false);
        this.dashboardSharedService.changeHeaderTitle(null);
        this.toggleSubscription.unsubscribe();
    }

}
