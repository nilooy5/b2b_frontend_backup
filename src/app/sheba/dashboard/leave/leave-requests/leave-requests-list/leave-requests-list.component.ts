import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {IDepartment, IEmployee} from '../../../../../types/users';
import {ILeaveRequest} from '../../i-leave';
import {LeaveService} from '../../leave-services/leave.service';
import {SelectionModel} from '@angular/cdk/collections';
import { ITEMS_PER_PAGE } from '../leave-requests-list.constant';
import {log} from 'util';


@Component({
    selector: 'app-leave-requests-list',
    templateUrl: './leave-requests-list.component.html',
    styleUrls: ['./leave-requests-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LeaveRequestsListComponent implements OnInit {

    static readonly ITEMS_PER_PAGE = 10;

    dataSource: MatTableDataSource<ILeaveRequest>;
    leaveRequests: ILeaveRequest[];
    employees: IEmployee[];
    departments: IDepartment[];
    filteredLeaveRequests: ILeaveRequest[];
    filteredEmployees: IEmployee[];
    totalLeaveRequestsCount: number;
    storeSortType = 'asc';
    sortType: string;
    selection = new SelectionModel<ILeaveRequest>(true, []);
    dataOffset = 1;
    currentLength = 0;
    previousValue = 0;
    paginationType: string;
    showRequestList = false;

    displayedColumns = ['select', 'employeeName', 'leaveType', 'leaveDays', 'leaveStatus', 'totalStatus', 'actions'];


    constructor(private activatedRoute: ActivatedRoute,
                private leaveService: LeaveService,
                private changeDetectorRef: ChangeDetectorRef,
                private router: Router) {
        activatedRoute.data.subscribe(({ leaveRequestsListResolver }) => {
            const { leaves, departments, employees, totalLeaveRequestsCount } = leaveRequestsListResolver;
            this.setVisibility(leaves);
            this.setLeaveRequests(leaves, totalLeaveRequestsCount);
            this.setDepartments(departments);
            this.setEmployees(employees);
        });
    }

    ngOnInit() { }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.filter(item => {
            return item.leaveStatus.label === 'Pending';
        }).length;
        const numRows = this.dataSource.data.filter(item => {
            return item.leaveStatus.label === 'Pending';
        }).length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: ILeaveRequest): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.employeeName + 1}`;
    }

    setLeaveRequests(leaves, totalLeaveRequestsCount = 0, offset = 0) {
        this.changeDetectorRef.markForCheck();
        if (leaves && leaves.length) {
            this.leaveRequests = this.mapLeaveRequestsList(leaves);
        } else {
            this.leaveRequests = [];
            this.dataOffset = 0;
        }
        this.totalLeaveRequestsCount = totalLeaveRequestsCount;
        this.currentLength = offset + this.leaveRequests.length;
        this.filteredLeaveRequests = this.leaveRequests;
        this.dataSource = new MatTableDataSource(this.filteredLeaveRequests);
    }

    setVisibility(leaves) {
        if (leaves.length > 0) {
            this.showRequestList = true;
        }
    }

    mapLeaveRequestsList(leaveRequests) {
        return leaveRequests.map((item) => {
            return {
                leaveRequestId: item.id,
                employeeName: item.leave.name,
                leaveType: item.leave.type,
                leaveDays: item.leave.total_days,
                leaveStatus: this.setLeaveStatusColor(item.status),
                totalStatus: this.setLeaveStatusColor(item.leave.status),
                approvers: this.getApprovers(item.leave.approvers)
            };
        });
    }

    setDepartments(departments) {
        departments && departments.length ? this.departments = departments : this.departments = [];
    }

    setEmployees(employees) {
        employees && employees.length ? this.employees = employees : this.employees = [];
        this.filteredEmployees = this.employees;
    }

    setLeaveStatusColor(status: string) {
        const type = {
            approved: {label: 'Approved', backgroundColor: '#2ba660'},
            pending: {label: 'Pending', backgroundColor: '#ff8219'},
            rejected: {label: 'Rejected', backgroundColor: '#FA5252'},
        };
        return type[status];
    }

    getApprovers(approvers) {
        return approvers.join(' ');
    }

    redirectToLeaveRequestDetails(leaveRequestInfo: ILeaveRequest) {
        this.router.navigate(['/', 'dashboard', 'leave', 'requests', leaveRequestInfo.leaveRequestId]).then();
    }

    sortEmployeeName() {
        this.sortType = this.storeSortType;
        this.storeSortType === 'asc' ? this.storeSortType = 'desc' : this.storeSortType = 'asc';
    }

    getLimit() {
        return ITEMS_PER_PAGE;
    }

    checkSelected(row) {
        this.selection.toggle(row);
    }

    filterLeaveRequests(filter?) {
        this.selection.clear();
        const { status, department, employee, search, page, sort } = filter;
        const filterParams = {
            limit: this.getLimit().toString(),
            offset: page.toString()
        };

        if (status) {
            if (status !== 'all') {
                filterParams['status'] = status;
            } else {
                filterParams['status'] = '';
            }
        }

        if (department) {
            if (department !== 'all') {
                filterParams['department'] = department;
                this.filteredEmployees = this.employees.filter(item => {
                    return item.department_id === parseInt(department);
                });
            } else {
                filterParams['department'] = '';
                this.filteredEmployees = this.employees;
            }
        }

        if (employee) {
            if (employee !== 'all') {
                filterParams['employee'] = employee;
            } else {
                filterParams['employee'] = '';
            }
        }

        if (sort) {
            filterParams['sort'] = sort;
        }

        if (search) {
            filterParams['search'] = search;
        }


        this.getFilteredLeaveRequests(filterParams);
    }

    getFilteredLeaveRequests(filters) {
        this.leaveService.fetchFilteredLeaveRequestsList(filters).subscribe(({ code, leaves, total_leave_requests }) => {
            if (code !== 200) {
                this.dataOffset = 0;
                this.currentLength = 0;
                this.setLeaveRequests([], 0 );
                return;
            }
            this.dataOffset = parseInt(filters.offset) + 1;
            this.setLeaveRequests(leaves, total_leave_requests, parseInt(filters.offset));
        });
    }

    checkStatus() {
        const pendingStatusLength = this.dataSource.data.filter((item) => {
            return item.leaveStatus.label === 'Pending';
        }).length;

        return pendingStatusLength !== 0;

    }
}
