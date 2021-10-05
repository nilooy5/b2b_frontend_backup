import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';

@Component({
    selector: 'app-attendance-daily-list',
    templateUrl: './attendance-daily-list.component.html',
    styleUrls: ['./attendance-daily-list.component.scss']
})
export class AttendanceDailyListComponent implements OnInit {

    static readonly ITEMS_PER_PAGE = 10;

    departments: any[];
    attendances: any[];
    dataSource: MatTableDataSource<any>;
    filteredAttendances: any[];
    totalAttendancesCount: number;
    dataOffset = 1;
    currentLength = 0;
    sort_attendance: any = [
        {sort_column: 'checkin_time', sort_type: 'asc'},
        {sort_column: 'checkout_time', sort_type: 'asc'},
        {sort_column: 'staying_time', sort_type: 'asc'},
    ];
    sortObj: {name: string, type: string};

    // displayedColumns = ['employeeName', 'department', 'date', 'check_in', 'check_out', 'hours', 'status', 'note', 'actions'];
    displayedColumns = ['employeeName', 'department', 'check_in', 'check_out', 'hours', 'actions'];

    constructor(private route: ActivatedRoute,
                private storage: StorageService,
                private http: ShebaHttpService,
                private router: Router) {
        this.route.data.subscribe(({ attendanceDailyListResolver }) => {
            const { attendances, departments, totalAttendancesCount } = attendanceDailyListResolver;
            this.setAttendanceList(attendances, totalAttendancesCount);
            this.setDepartmentList(departments);
        });
    }

    ngOnInit() {
    }

    getLimit() {
        return AttendanceDailyListComponent.ITEMS_PER_PAGE;
    }

    setAttendanceList(attendances, totalAttendancesCount= 0, offset = 0) {
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

    redirectToAttendanceDetails(attendanceInfo) {
        /*const start_date =  moment(attendanceInfo.created_at).startOf('month').format('YYYY-MM-DD');
         const end_date =  moment(attendanceInfo.created_at).endOf('month').format('YYYY-MM-DD');*/
        /*console.log(attendanceInfo.member);*/
        const month = '0' + (new Date().getMonth() + 1).toString().slice(-2);
        this.router.navigate(['/', 'dashboard', 'attendance', attendanceInfo.member.id], {queryParams: {month}}).then();
    }

    sortCheckInTime() {
        this.sort_attendance.forEach((status) => {
            if (status.sort_column === 'checkin_time') {
                this.sortObj = {
                    name: status.sort_column,
                    type: status.sort_type
                };
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    sortCheckOutTime() {
        this.sort_attendance.forEach((status) => {
            if (status.sort_column === 'checkout_time') {
                this.sortObj = {
                    name: status.sort_column,
                    type: status.sort_type
                };
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    sortHours() {
        this.sort_attendance.forEach((status) => {
            if (status.sort_column === 'staying_time') {
                this.sortObj = {
                    name: status.sort_column,
                    type: status.sort_type
                };
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    setFilteredAttendancesList(filter) {
        const {department, page, search, check_in_status, check_out_status, sort_column, sort_type, date} = filter;
        const filterParams = {
            limit: this.getLimit().toString(),
            offset: page.toString()
        };

        // if (status) {
        //     filterParams['status'] = status;
        // }
        if (check_in_status) {
            if (check_in_status !== 'all') {
                filterParams['checkin_status'] = check_in_status;
            } else {
                filterParams['checkin_status'] = '';
            }
        }

        if (check_out_status) {
            if (check_out_status !== 'all') {
                filterParams['checkout_status'] = check_out_status;
            } else {
                filterParams['checkout_status'] = '';
            }
        }

        if (date) {
            filterParams['date'] = date;
        }
        if (sort_column) {
            filterParams['sort_column'] = sort_column;
        }

        if (sort_type) {
            filterParams['sort'] = sort_type;
        }

        if (search) {
            filterParams['search'] = search;
        }

        // if (start_date && end_date) {
        //     filterParams['start_date'] = start_date;
        //     filterParams['end_date'] = end_date;
        // }

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
        const url = 'v2/businesses/' + this.storage.user.business_id + '/attendances/daily?';
        this.http.get(url, {params: filters, responseType: 'text'}).toPromise().then((res) => {
            if (JSON.parse(res).code !== 200) {
                this.dataOffset = 0;
                this.currentLength = 0;
                this.setAttendanceList([], 0);
                return;
            }
            this.dataOffset = parseInt(filters.offset) + 1;
            // console.log(JSON.parse(res).attendances);
            this.setAttendanceList(JSON.parse(res).attendances, JSON.parse(res).total, parseInt(filters.offset));
        });
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
