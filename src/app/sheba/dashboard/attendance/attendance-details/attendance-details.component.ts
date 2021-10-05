import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { StorageService } from '../../../../services/storage.service';
import { ShebaHttpService } from '../../../../modules/sheba-http/sheba-http.service';
import { IAttendance } from '../../../../types/attendance';
import * as moment from 'moment';
import {environment} from '../../../../../environments/environment';
import * as $ from 'jquery';
import {Breadcrumb} from '../../../../types/general';
import {DashboardSharedService} from '../../../../services/dashboard-shared.service';

@Component({
    selector: 'app-attendance-details',
    templateUrl: './attendance-details.component.html',
    styleUrls: ['./attendance-details.component.scss']
})

export class AttendanceDetailsComponent implements OnInit, OnDestroy {

    employeeDetails: any;
    attendanceStat: any;
    attendances: IAttendance[];
    dataSource: MatTableDataSource<IAttendance>;
    currentEmployeeId: any;
    currentMonth: any;

    @Output () filterEmitter = new EventEmitter<any>();

    // displayedColumns = ['date', 'check_in', 'check_out', 'hours', 'status', 'note'];
    displayedColumns = ['date', 'check_in', 'check_out', 'hours'];
    public filter: any;

    months: any = [
        { key: '01', title: 'January' },
        { key: '02', title: 'February' },
        { key: '03', title: 'March' },
        { key: '04', title: 'April' },
        { key: '05', title: 'May' },
        { key: '06', title: 'June' },
        { key: '07', title: 'July' },
        { key: '08', title: 'August' },
        { key: '09', title: 'September' },
        { key: '10', title: 'October' },
        { key: '11', title: 'November' },
        { key: '12', title: 'December' },
    ];

    sort_attendance: any = [
        {sort_column: 'sort_on_date', sort_type: 'asc'},
        {sort_column: 'sort_on_checkin', sort_type: 'asc'},
        {sort_column: 'sort_on_checkout', sort_type: 'asc'},
        {sort_column: 'sort_on_hour', sort_type: 'asc'},
    ];
    sortObj: {name: string, type: string};

    breadcrumb: Breadcrumb[] = [
        {
            title: 'Attendance',
            path: '/dashboard/attendance/daily'
        },
        {
            title: 'Daily-Monthly',
            path: '/dashboard/attendance/monthly'
        },
        {
            title: 'Details',
            isActive: true
        }
    ];

    constructor(private route: ActivatedRoute,
                private storage: StorageService,
                private dashboardSharedService: DashboardSharedService,
                private http: ShebaHttpService) {
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.route.data.subscribe(({ attendanceDetailsResolver }) => {
            const { stat, attendances, employee } = attendanceDetailsResolver;
            this.setEmployeeDetails(employee);
            this.setAttendanceStat(stat);
            this.setAttendances(attendances);
        });
        this.currentEmployeeId = route.snapshot.params.id;
        this.currentMonth = this.route.snapshot.queryParams.month;
        this.filter = {
            month: null,
            sort_column: null,
            sort_type: null
        };
    }

    ngOnInit() {  }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

    selectMonth(event) {
        const filterParams = {};

        this.filter.month = event.target.value;
        this.currentMonth = event.target.value;
        filterParams['month'] = this.filter.month;
        this.getFilteredDetails(filterParams);
    }

    setEmployeeDetails(employee) {
        this.employeeDetails = employee ;
    }

    setAttendanceStat(stat) {
        this.attendanceStat = stat;
    }

    setAttendances(attendances) {
        this.attendances = this.filterAttendanceList(attendances);
        console.log(this.attendances);
        this.dataSource = new MatTableDataSource(this.attendances);
    }

    filterAttendanceList(attendance) {
        return attendance.map((item) => this.handleAttendance(item));
    }

    handleAttendance(item) {
        const obj = {
            date: this.formatDate(item.date),
            check_in_time: null,
            check_out_time: null,
            active_hours: null,
            status: null,
            checkin_status: null,
            checkout_status: null,
            is_checkin_remote: null,
            is_checkout_remote: null,
            check_in_address: null,
            check_out_address: null,
            note: null
        };

        if (item.weekend_or_holiday_tag) {
            return this.getObjectForHoliday(item, obj);
        }
        return this.getObjectForWorkingDay(item, obj);
    }

    formatDate(date) {
        const f_date = date.split('-');
        return [f_date[2], f_date[1], f_date[0]].join(' / ');
    }

    getObjectForHoliday(item, obj) {
        const check_in_time = item.show_attendance
            ? item.attendance.check_in.time
            : item.weekend_or_holiday_tag;

        const check_out_time = item.attendance && item.attendance.check_out ? item.attendance.check_out.time : null;
        const active_hours = item.attendance ? item.attendance.active_hours : null;
        const is_checkin_remote = item.attendance ? item.attendance.check_in.is_remote : 0;
        const is_checkout_remote = item.attendance && item.attendance.check_out ? item.attendance.check_out.is_remote : 0;
        const check_in_address = item.attendance ? item.attendance.check_in.address : null;
        const check_out_address = item.attendance && item.attendance.check_out ? item.attendance.check_out.address : null;
        return {
            ...obj,
            check_in_time,
            check_out_time,
            active_hours,
            is_checkin_remote,
            is_checkout_remote,
            check_in_address,
            check_out_address
        };
    }

    getObjectForWorkingDay(item, obj) {
        if (item.show_attendance) {
            return {
                ...obj,
                check_in_time: item.attendance.check_in.time,
                check_out_time: item.attendance.check_out ? item.attendance.check_out.time : null,
                active_hours: item.attendance.active_hours,
                // status: item.attendance.status,
                note: item.attendance.note,
                checkin_status: item.attendance.check_in.status,
                checkout_status: item.attendance.check_out ? item.attendance.check_out.status : null,
                is_checkin_remote: item.attendance.check_in.is_remote,
                is_checkout_remote: item.attendance.check_out ? item.attendance.check_out.is_remote : 0,
                check_in_address: item.attendance.check_in.address,
                check_out_address: item.attendance.check_out ? item.attendance.check_out.address : null
            };
        }
        if (!item.show_attendance && item.is_absent) {
            return {
                ...obj,
                status: 'absent'
            };
        }
        if (!item.show_attendance && !item.is_absent && !item.weekend_or_holiday_tag) {
            return {
                ...obj,
                check_in_time: 'N/A'
            };
        }
        return obj;
    }

    sortDate() {
        this.sort_attendance.forEach((status) => {
            if (status.sort_column === 'sort_on_date') {
                this.sortWithFilter(status.sort_column, status.sort_type);
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    sortCheckIn() {
        this.sort_attendance.forEach((status) => {
            if (status.sort_column === 'sort_on_checkin') {
                this.sortWithFilter(status.sort_column, status.sort_type);
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    sortCheckOut() {
        this.sort_attendance.forEach((status) => {
            if (status.sort_column === 'sort_on_checkout') {
                // const filterParams = {};
                // filterParams['month'] = this.filter.month;
                // filterParams['sort_on_checkout'] = status.sort_type;
                // this.getFilteredDetails(filterParams);
                this.sortWithFilter(status.sort_column, status.sort_type);
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    sortHours() {
        this.sort_attendance.forEach((status) => {
            if (status.sort_column === 'sort_on_hour') {
                this.sortWithFilter(status.sort_column, status.sort_type);
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    sortWithFilter(sort_column, sort_type) {
        const filterParams = {};
        filterParams['month'] = this.filter.month ? this.filter.month : this.currentMonth;
        filterParams[sort_column] = sort_type;
        this.getFilteredDetails(filterParams);
    }

    setFilteredAttendance(filter) {
        const {month} = filter;
        const filterParams = {};

        if (month) {
            filterParams['month'] = month;
        }
        this.getFilteredDetails(filterParams);
    }

    getFilteredDetails(filters) {
        console.log(filters);
        const url = 'v2/businesses/' + this.storage.user.business_id + '/members/' + this.employeeDetails.id + '/attendances';
        this.http.get(url, {params: filters, responseType: 'text' }).toPromise().then((res) => {
            this.setAttendanceStat(JSON.parse(res).stat);
            this.setEmployeeDetails(JSON.parse(res).employee);
            this.setAttendances(JSON.parse(res).attendances);
        });
    }

    downloadExcelReport() {
        return environment.api_url + 'v2/businesses/' + this.storage.user.business_id
            + '/members/' + this.currentEmployeeId + '/attendances?month=' + this.currentMonth
            + '&file=excel&token=' + this.storage.user.token;
    }

    removeFocus(index) {
        $('#note' + index).on({
            focus() {
                $(this).blur();
            }
        });
    }
}
