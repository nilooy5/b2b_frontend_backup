import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import * as moment from 'moment';

@Component({
    selector: 'app-attendance-monthly-list',
    templateUrl: './attendance-monthly-list.component.html',
    styleUrls: ['./attendance-monthly-list.component.scss']
})
export class AttendanceMonthlyListComponent implements OnInit {

    static readonly ITEMS_PER_PAGE = 10;

    departments: any[];
    attendances: any[];
    dataSource: MatTableDataSource<any>;
    filteredAttendances: any[];
    totalAttendancesCount: number;
    dataOffset = 1;
    currentLength = 0;
    sort_attendance: any = [
        {sort_column: 'sort_on_present', sort_type: 'asc'},
        {sort_column: 'sort_on_leave', sort_type: 'asc'},
        {sort_column: 'sort_on_absent', sort_type: 'asc'},
    ];
    sortObj: {name: string, type: string};

    // displayedColumns = ['employeeName', 'department', 'present', 'on_time', 'late', 'left_early', 'absent', 'leave', 'actions'];
    displayedColumns = ['employeeName', 'department', 'days', 'present', 'on_leave', 'absent', 'actions'];

    constructor(private route: ActivatedRoute,
                private storage: StorageService,
                private http: ShebaHttpService,
                private router: Router) {
        this.route.data.subscribe(({ attendanceMonthlyListResolver }) => {
            const { all_employee_attendance, departments, totalAttendancesCount } = attendanceMonthlyListResolver;
            this.setAttendanceList(all_employee_attendance, totalAttendancesCount);
            this.setDepartmentList(departments);
        });
    }

    ngOnInit() {
    }

    getLimit() {
        return AttendanceMonthlyListComponent.ITEMS_PER_PAGE;
    }

    setAttendanceList(attendances, totalAttendancesCount = 0, offset = 0) {
        if (attendances && attendances.length) {
            this.attendances = attendances;
        } else {
            this.attendances = [];
            this.dataOffset = 0;
        }
        // attendances && attendances.length ? this.attendances = attendances : this.attendances = [];
        this.totalAttendancesCount = totalAttendancesCount;
        this.currentLength = offset + this.attendances.length;
        this.filteredAttendances = this.attendances;
        this.dataSource = new MatTableDataSource(this.filteredAttendances);
    }
    setDepartmentList(departments) {
        departments && departments.length ? this.departments = departments : this.departments = [];
    }

    sortPresent() {
        this.sort_attendance.forEach((status) => {
            if (status.sort_column === 'sort_on_present') {
                this.sortObj = {
                    name: status.sort_column,
                    type: status.sort_type
                };
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    sortOnLeave() {
        this.sort_attendance.forEach((status) => {
            if (status.sort_column === 'sort_on_leave') {
                this.sortObj = {
                    name: status.sort_column,
                    type: status.sort_type
                };
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    sortAbsent() {
        this.sort_attendance.forEach((status) => {
            if (status.sort_column === 'sort_on_absent') {
                this.sortObj = {
                    name: status.sort_column,
                    type: status.sort_type
                };
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    setFilteredAttendancesList(filter) {
        const {department, page, search, month, sort_column, sort_type } = filter;
        const filterParams = {
            limit: this.getLimit().toString(),
            offset: page.toString()
        };

        if (month) {
            filterParams['month'] = month;
        }

        if (sort_column && sort_type) {
            filterParams[sort_column] = sort_type;
        }

        if (search) {
            filterParams['search'] = search;
        }

        if (department) {
            if (department !== 'all') {
                filterParams['department_id'] = department;
            } else {
                filterParams['department_id'] = '';
            }
        }

        this.getFilteredAttendances(filterParams);
    }

    getFilteredAttendances(filters) {
        console.log(filters);
        const url = 'v2/businesses/' + this.storage.user.business_id + '/attendances/monthly';
        this.http.get(url, {params: filters, responseType: 'text' }).toPromise().then((res) => {
            if (JSON.parse(res).code !== 200) {
                this.dataOffset = 0;
                this.currentLength = 0;
                this.setAttendanceList([], 0);
                return;
            }
            this.dataOffset = parseInt(filters.offset) + 1;
            this.setAttendanceList(JSON.parse(res).all_employee_attendance, JSON.parse(res).total_members, parseInt(filters.offset));
        });
    }

    redirectToAttendanceDetails(attendanceInfo) {
        /*const start_date =  moment(attendanceInfo.created_at).startOf('month').format('YYYY-MM-DD');
        const end_date =  moment(attendanceInfo.created_at).endOf('month').format('YYYY-MM-DD');*/
        const month = '0' + (new Date().getMonth() + 1).toString().slice(-2);

        this.router.navigate(['/', 'dashboard', 'attendance', attendanceInfo.member.id], {queryParams: { month }}).then();
    }

    handleAlphabeticSort(key) {
        this.filteredAttendances = this.attendances.sort((a, b) => {
            if (key === 'ascending') {
                return a.member.name.toLowerCase() < b.member.name.toLowerCase() ? -1 : 1;
            }
            if (key === 'descending') {
                return a.member.name.toLowerCase() > b.member.name.toLowerCase() ? -1 : 1;
            }
        });
        this.dataSource = new MatTableDataSource(this.filteredAttendances);
    }
    handleSearch(key) {
        this.filteredAttendances = this.attendances.filter(item => {
            return item.member.name.toLowerCase().includes(key.toLowerCase())
                || item.member.name.toLowerCase().includes(key.toLowerCase());
        });
        this.dataSource = new MatTableDataSource(this.filteredAttendances);
    }
}
