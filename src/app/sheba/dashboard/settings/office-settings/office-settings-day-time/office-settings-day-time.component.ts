import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardSharedService } from '../../../../../services/dashboard-shared.service';
import { Breadcrumb } from '../../../../../types/general';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-office-settings-day-time',
    templateUrl: './office-settings-day-time.component.html',
    // encapsulation: ViewEncapsulation.None,
    styleUrls: ['./office-settings-day-time.component.scss']
})
export class OfficeSettingsDayTimeComponent implements OnInit, OnDestroy {

    office_timing: any;
    weekend_days: any;
    showSuccessAlert = false;
    staticAlertClosed = false;
    breadcrumb: Breadcrumb[] = [
        {
            title: 'Settings',
            path: '/dashboard/settings'
        },
        {
            title: 'Office Settings',
            path: '/dashboard/settings/office/day-time'
        }
    ];

    constructor(private dashboardSharedService: DashboardSharedService,
                private route: ActivatedRoute) {
        this.route.data.subscribe(({officeSettingsTimeResolver}) => {
            const office_timing_info = officeSettingsTimeResolver[0];
            this.office_timing = office_timing_info.office_timing;
            this.weekend_days = this.getWeekendDays(this.office_timing.weekends);
        });
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
    }

    ngOnInit() {
        if (window.history.state.alertStatus) {
            this.showSuccessAlert = window.history.state.alertStatus;
        }
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

    getWeekendDays(weekends) {
        let valuestring = '';
        weekends.forEach((weekend, index) => {
            weekend = this.makestringUppercase(weekend);
            index === weekends.length - 1 ? valuestring += weekend : valuestring += weekend + ', ';
        });
        return valuestring;
    }
    makestringUppercase(weekend) {
        return weekend.charAt(0).toUpperCase() + weekend.slice(1);
    }
}
