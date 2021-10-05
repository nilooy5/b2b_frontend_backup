import {Component, OnDestroy, OnInit} from '@angular/core';
import {Breadcrumb} from '../../../../../types/general';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-leave-settings-others',
    templateUrl: './leave-settings-others.component.html',
    styleUrls: ['./leave-settings-others.component.scss']
})
export class LeaveSettingsOthersComponent implements OnInit, OnDestroy {

    breadcrumb: Breadcrumb[] = [
        {
            title: 'Settings',
            path: '/dashboard/settings'
        },
        {
            title: 'Leave',
            isActive: true
        }
    ];
    showSuccessAlert = false;
    successAlertClosed = false;
    others_info;

    constructor(private dashboardSharedService: DashboardSharedService,
                private route: ActivatedRoute,
                private router: Router) {
        this.route.data.subscribe(res => {
            console.log(res.leaveSettingOthersInfo.others_info);
            this.setOthersInfo(res.leaveSettingOthersInfo.others_info);
        });
        this.initializeBreadcrumb();
    }

    ngOnInit() {
        if (window.history.state.alertStatus) {
            this.showSuccessAlert = window.history.state.alertStatus;
        }
    }

    setOthersInfo(others_info) {
       this.others_info = others_info;
    }

    initializeBreadcrumb() {
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
    }

    goToEdit() {
        this.router.navigate(['/', 'dashboard', 'settings', 'leave', 'others', 'edit']).then();
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

}
