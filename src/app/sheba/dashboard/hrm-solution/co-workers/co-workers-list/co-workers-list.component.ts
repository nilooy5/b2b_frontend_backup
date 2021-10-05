import {Component, OnDestroy, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IDepartment, IEmployee} from '../../../../../types/users';
import {MatTableDataSource, MatSort} from '@angular/material';
import {AttendanceDailyListComponent} from '../../../attendance/attendance-daily/attendance-daily-list/attendance-daily-list.component';
import {StorageService} from 'src/app/services/storage.service';
import {ShebaHttpService} from 'src/app/modules/sheba-http/sheba-http.service';
import {ILeaveRequest} from '../../../leave/i-leave';
import {LeaveService} from '../../../leave/leave-services/leave.service';
import {SelectionModel} from '@angular/cdk/collections';
import {CoWorkersListService} from '../co-workers-services/co-workers-list.service';
import {delay, debounceTime, throttleTime} from 'rxjs/operators';

@Component({
    selector: 'app-co-workers-list',
    templateUrl: './co-workers-list.component.html',
    styleUrls: ['./co-workers-list.component.scss']
})

export class CoWorkersListComponent implements OnInit, OnDestroy {

    coworkers: IEmployee[];
    departments: IDepartment[];
    ITEMS_PER_PAGE = 10;
    dataSource: MatTableDataSource<IEmployee>;
    sortObj: { name: string, type: string };
    sortType: string;
    selection = new SelectionModel<IEmployee>(true, []);
    dataOffset = 0;
    currentLength = 0;
    previousValue = 0;
    paginationType: string;
    displayedColumns = ['select', 'id', 'name', 'email', 'phone', 'department', 'status', 'actions'];
    totalCoworkerCount: number;
    filterCoWorkers: IEmployee[];
    sort_co_worker: any = [
        {sort_column: 'sort_by_name', sort_type: 'asc'},
        {sort_column: 'sort_by_department', sort_type: 'asc'},
        {sort_column: 'sort_by_status', sort_type: 'asc'},
    ];

    constructor(private dashboardSharedService: DashboardSharedService,
                private router: Router,
                private coWorkerListService: CoWorkersListService,
                private storage: StorageService,
                private http: ShebaHttpService,
                private activatedRoute: ActivatedRoute) {
        this.dashboardSharedService.changeHeaderTitle('Co-Workers List');
        activatedRoute.data.subscribe(({coworkersList}) => {
            this.setCoWorkersList(coworkersList.employees);
            this.setDepartmentsList(coworkersList.departments);
        });
    }

    // ngOnInit() {
    //     this.dashboardSharedService.changeHeaderTitle('Co-Workers List');
    // }

    setCoWorkersList(employees: IEmployee[]) {
        const filterParams = {
            limit: this.getLimit().toString(),
            offset: this.dataOffset.toString()
        };
        this.getFilterCoworkers(filterParams);
    }

    setDepartmentsList(departments: IDepartment[]) {
        this.departments = departments;
    }

    ngOnDestroy(): void {
        this.dashboardSharedService.changeHeaderTitle(null);
    }


    ngOnInit() {
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        if (this.dataSource && this.dataSource.data) {
            const numRows = this.dataSource.data.length;
            return numSelected === numRows;
        }
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: IEmployee): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    setCoWorkerList(coWorkerList, offset = 0, totalCoworker = 0) {
        this.totalCoworkerCount = totalCoworker;
        this.filterCoWorkers = coWorkerList ? coWorkerList : [];
        this.currentLength = offset + coWorkerList.length;
        this.filterCoWorkers.forEach(ele => {
            if (ele.status === 'active') {
                ele.status_bg_color = '#2ba660';
            } else if (ele.status === 'inactive') {
                ele.status_bg_color = '#b3b7cc';
            } else if (ele.status === 'invited') {
                ele.status_bg_color = '#ff8219';
            }
        });
        this.dataSource = new MatTableDataSource(this.filterCoWorkers);
    }

    setLeaveStatusColor(status: string) {
        const type = {
            approved: {label: 'Approved', backgroundColor: '#2ba660'},
            pending: {label: 'Pending', backgroundColor: '#ff8219'},
            rejected: {label: 'Rejected', backgroundColor: '#FA5252'},
        };
        return type[status];
    }

    getLimit() {
        return this.ITEMS_PER_PAGE;
    }

    filterCoworkers(filter?) {
        this.selection.clear();
        const {status, department, search, page, sort, action} = filter;
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
            } else {
                filterParams['department'] = '';
            }
        }

        if (filter.sort_column && filter.sort_type) {
            filterParams[filter.sort_column] = filter.sort_type;
        }

        if (search) {
            filterParams['search'] = search;
        }
        if (action) {
            this.getCoWorkerList(filterParams);
        } else {
            this.getFilterCoworkers(filterParams);
        }

    }

    getFilterCoworkers(filterParams: any) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/employees',
            {
                params: filterParams,
                responseType: 'text'
            }
        ).pipe(throttleTime(500)).subscribe(res => {
            if (JSON.parse(res).code !== 200) {
                this.dataOffset = 0;
                this.currentLength = 0;
                this.setCoWorkerList(null, 0);
                return;
            }
            this.dataOffset = parseInt(filterParams.offset) + 1;
            this.setCoWorkerList(JSON.parse(res).employees || [], parseInt(filterParams.offset), JSON.parse(res).total_employees);
        });
    }

    getCoWorkerList(filterParams: any) {
        this.coWorkerListService.getCoWorkersList().subscribe(res => {
            this.coworkers = res.employees;
            this.coworkers.forEach(ele => {
                if (ele.status === 'active') {
                    ele.status_bg_color = '#2ba660';
                } else if (ele.status === 'inactive') {
                    ele.status_bg_color = '#b3b7cc';
                } else if (ele.status === 'invited') {
                    ele.status_bg_color = '#ff8219';
                }
            });
            this.getFilterCoworkers(filterParams);
        });
    }

    redirectToCoWorkerDetails(row: any) {
        this.router.navigate(['/', 'dashboard', 'co-workers', row.id]);
    }

    sort(property) {
        this.sort_co_worker.forEach((status) => {
            if (status.sort_column === property) {
                this.sortObj = {
                    name: status.sort_column,
                    type: status.sort_type
                };
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }
}
