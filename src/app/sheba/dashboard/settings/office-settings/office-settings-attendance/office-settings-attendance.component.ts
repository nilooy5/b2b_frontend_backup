import { Component, OnDestroy, OnInit } from '@angular/core';
import { DashboardSharedService } from '../../../../../services/dashboard-shared.service';
import {Breadcrumb} from '../../../../../types/general';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-office-settings-attendance',
    templateUrl: './office-settings-attendance.component.html',
    styleUrls: ['./office-settings-attendance.component.scss']
})

export class OfficeSettingsAttendanceComponent implements OnInit, OnDestroy {

    business_attendance_types: any;
    business_offices: any;
    successAlertClosed = false;
    infoAlertClosed = false;
    warningAlertClosed = false;
    show_ips = false;
    showSuccessAlert = false;
    showWarningAlert = false;
    breadcrumb: Breadcrumb[] = [
        {
            title: 'Settings',
            path: '/dashboard/settings'
        },
        {
            title: 'Office Settings',
            path: '/dashboard/settings/office/attendance'
        }
    ];

    constructor(private dashboardSharedService: DashboardSharedService,
                private route: ActivatedRoute) {
        this.route.data.subscribe(({officeAttendanceSettingResolver}) => {
            const attendance_info = officeAttendanceSettingResolver[0];
            this.business_attendance_types = this.getBusinessAttendanceTypes(attendance_info.business_attendance_types);
            this.business_offices = attendance_info.business_offices;
            this.checkIpEnabled(attendance_info.business_attendance_types);
        });
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
    }

    ngOnInit() {
        if (window.history.state.alertSuccess) {
            this.showSuccessAlert = window.history.state.alertSuccess;
        }
        if (window.history.state.alertWarning) {
            this.showWarningAlert = window.history.state.alertWarning;
        }
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

    checkIpEnabled(types) {
        const attendance_type = [];
        types.forEach((type) => {
            if (type.status === 'not_deleted') {
                attendance_type.push(type.type);
            }
        });
        if (attendance_type.includes('ip_based')) {
            this.show_ips = true;
        }
    }

    getBusinessAttendanceTypes(attendance_types) {
        let valuestring = '';
        const types = [];
        attendance_types.forEach((attendance_type) => {
            if (attendance_type.status !== 'deleted') {
                types.push(attendance_type);
            }
        });
        types.forEach((type, index) => {
            type = this.makestringUppercase(type.type);
            index === types.length - 1 ? valuestring += type : valuestring += type + ' , ';
        });
        return valuestring;
    }
    makestringUppercase(type) {
        return type.charAt(0).toUpperCase() + type.slice(1);
    }

}
