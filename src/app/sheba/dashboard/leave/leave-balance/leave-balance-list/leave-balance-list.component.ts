import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LeaveBalanceListResolverService} from '../../leave-services/leave-balance-list-resolver.service';
import {MatTableDataSource} from '@angular/material/table';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
    selector: 'app-leave-balance-list',
    templateUrl: './leave-balance-list.component.html',
    styleUrls: ['./leave-balance-list.component.scss']
})
export class LeaveBalanceListComponent implements OnInit {

    static readonly ITEMS_PER_PAGE = 10;

    departments: any[];
    employees: any[];
    filteredEmployees: any[];
    leave_balances: any;
    filteredLeaveBalances: any[];
    total_records: any;
    leave_types: any;
    dataOffset = 1;
    currentLength = 0;
    storeSortType = 'asc';
    sortType: string;
    showBalanceList = false;

    dataSource: MatTableDataSource<any>;

    columnDefinitions: { columnDef: string;  columnTitle: string; }[] = [
        {
        columnDef: 'Employee Name',
        columnTitle: 'Employee Name'
        }
    ];
    displayedColumns: any[] = [];

    // displayedColumns = ['employee_name', 'casual_leave', 'sick_leave', 'annual_leave', 'other_leave_1', 'other_leave_2', 'actions'];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private storage: StorageService,
                private http: ShebaHttpService) {
        this.route.data.subscribe(({leaveBalanceListResolver}) => {
            const {leave_balances, total_records, leave_types, departments, employees} = leaveBalanceListResolver;
            this.setVisibility(leave_balances);
            this.setDepartmentList(departments);
            this.setEmployees(employees);
            this.setLeaveBalanceHeaders(leave_types);
            this.setLeaveBalances(leave_balances, total_records, leave_types);
        });
    }

    ngOnInit() { }

    getLimit() {
        return LeaveBalanceListComponent.ITEMS_PER_PAGE;
    }

    setVisibility(leave_balances) {
        if (leave_balances.length > 0) {
            this.showBalanceList = true;
        }
    }

    setLeaveBalanceHeaders(headers) {
        headers.forEach((item) => {
            this.columnDefinitions.push({columnDef: item.title, columnTitle: item.title});
        });
        this.columnDefinitions.push({columnDef: 'action', columnTitle: ''});
        this.displayedColumns = this.columnDefinitions.map((columnDefinition) => {
            return columnDefinition.columnDef;
        });
    }

    redirectToLeaveBalanceDetails(employee) {
        this.router.navigate(['/', 'dashboard', 'leave', 'balance', employee.id]).then();
    }

    setLeaveBalances(leave_balances, total_records, leave_types, offset = 0) {
        leave_balances && leave_balances.length ? this.leave_balances = this.mapLeaveBalanceList(leave_balances) : this.leave_balances = [];
        this.total_records = total_records;
        this.currentLength = offset + this.leave_balances.length;
        this.filteredLeaveBalances = this.leave_balances;
        this.leave_types = leave_types;
        this.dataSource = new MatTableDataSource(this.filteredLeaveBalances);
    }

    setDepartmentList(departments) {
        departments && departments.length ? this.departments = departments : this.departments = [];
    }

    setEmployees(employees) {
        employees && employees.length ? this.employees = employees : this.employees = [];
        this.filteredEmployees = this.employees;
    }

    mapLeaveBalanceList(leaveBalance) {
        return leaveBalance.map((item) => {
            const a = item.leave_balance.reduce((currentValue, nextValue) => {
                return {
                    ...currentValue,
                    [nextValue.title]: this.setColor(nextValue.used_leaves, nextValue.allowed_leaves, nextValue.is_leave_days_exceeded)
                };
            }, {});

            return {
                id: item.id,
                'Employee Name': item.employee_name,
                ...a
            };

        });
    }



    setColor(used_leave: number, allowed_leave: number, hasExceeded: boolean) {
        return {
            label: `${used_leave}/${allowed_leave}`,
            color: hasExceeded ? '#a00518' : 'rgba(0, 0, 0, 0.6)'
        };
    }


    handleAlphabeticSort(key) {
        this.filteredLeaveBalances = this.leave_balances.sort((a, b) => {
            if (key === 'ascending') {
                return a.member.name.toLowerCase() < b.member.name.toLowerCase() ? -1 : 1;
            }
            if (key === 'descending') {
                return a.member.name.toLowerCase() > b.member.name.toLowerCase() ? -1 : 1;
            }
        });
        this.dataSource = new MatTableDataSource(this.filteredLeaveBalances);
    }

    setFilteredAttendancesList(filter) {
        const {department, searchEmployee, sortByName, page} = filter;
        const filterParams = {
            limit: this.getLimit().toString(),
            offset: page.toString()
        };

        if (department) {
            if (department !== 'all') {
                filterParams['department'] = department;
            } else {
                filterParams['department'] = '';
            }
        }

        if (searchEmployee) {
            if (!searchEmployee) {
                filterParams['search'] = '';
            } else {
                filterParams['search'] = searchEmployee;
            }
        }

        if (sortByName) {
            if (!sortByName) {
                filterParams['sort'] = '';
            } else {
                filterParams['sort'] = sortByName;
            }
        }

        this.getFilteredLeaveBalances(filterParams);
    }

    getFilteredLeaveBalances(filters) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/leaves/balance/lists';
        this.http.get(url, {params: filters, responseType: 'text' }).toPromise().then((res) => {
            const response = JSON.parse(res);
            if (response.code !== 200 || response.leave_balances.length === 0) {
                this.dataOffset = 0;
                this.currentLength = 0;
                this.setLeaveBalances([], 0 , []);
                return;
            }
            this.dataOffset = parseInt(filters.offset) + 1;
            this.setLeaveBalances(response.leave_balances, response.total_records, response.leave_types, parseInt(filters.offset));
            // console.log(res);
            // this.setLeaveBalances(JSON.parse(res).leave_balances, JSON.parse(res).total_records, JSON.parse(res).leave_types);
        });
    }

    sortEmployeeName() {
        this.sortType = this.storeSortType;
        this.storeSortType === 'asc' ? this.storeSortType = 'desc' : this.storeSortType = 'asc';
    }

    checkType(element) {
        return typeof element;
        // return Object.prototype.toString.call(element).slice(8, -1);
    }
}
