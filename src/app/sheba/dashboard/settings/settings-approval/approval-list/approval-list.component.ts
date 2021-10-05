/* tslint:disable:no-trailing-whitespace */
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';

export interface PeriodicElement {
    title: string;
    department: string;
    approverCount: number;
    approvers: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {title: 'CX Approval Flow', department: 'CX', approverCount: 4, approvers: 'test'},
    {title: 'Technology Approval Flow', department: 'Technology', approverCount: 2, approvers: 'er'},
    {title: 'Product Approval Flow', department: 'Product', approverCount: 6, approvers: 'qwe'}
];

@Component({
    selector: 'app-approval-list',
    templateUrl: './approval-list.component.html',
    styleUrls: ['./approval-list.component.scss']
})

export class ApprovalListComponent implements OnInit {

    static readonly ITEMS_PER_PAGE = 10;

    types: any[];
    departments: any[];
    approvals: any[];
    displayedColumns: string[] = ['type', 'title', 'department', 'approverCount', 'approvers', 'actions'];
    dataSource;
    totalApprovalsFlowCount: any;
    filteredApprovals: any[];

    constructor(private activatedRoute: ActivatedRoute,
                private storage: StorageService,
                private router: Router,
                private http: ShebaHttpService) {
        this.activatedRoute.data.subscribe(({ approvalListResolver }) => {
            const { types, approval, departments, totalApprovalsFlowCount } = approvalListResolver;
            this.setApprovalFlows(approval, totalApprovalsFlowCount);
            this.setModules(types);
            this.setDepartments(departments);
        });
    }

    ngOnInit() { }

    setModules(types) {
        types && types.length ? this.types = types : this.types = [];
    }

    setDepartments(departments) {
        departments && departments.length ? this.departments = departments : this.departments = [];
    }

    setApprovalFlows(approval, totalApprovalsFlowCount?) {
        approval && approval.length ? this.approvals = approval : this.approvals = [];
        this.totalApprovalsFlowCount = totalApprovalsFlowCount;
        this.filteredApprovals = this.approvals;
        this.dataSource = new MatTableDataSource(this.filteredApprovals);
    }

    redirectToApprovalFlowDetails(row: any) {
        this.router.navigate(['/', 'dashboard', 'settings', 'approval', row.id]);
    }

    handleAlphabeticSort(key) {
        this.filteredApprovals = this.approvals.sort((a, b) => {
            if (key === 'ascending') {
                return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
            }
            if (key === 'descending') {
                return a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1;
            }
        });

        this.dataSource = new MatTableDataSource(this.filteredApprovals);
    }

    getLimit() {
        return ApprovalListComponent.ITEMS_PER_PAGE;
    }

    setFilteredApprovalsFlowList(event: any) {
        const { type, department, page } = event;
        const filterParams = {
            limit: this.getLimit().toString(),
            offset: page.toString()
        };
        if (department) {
            if (department !== 'all') {
                filterParams['business_department_id'] = department;
            } else {
                filterParams['business_department_id'] = '';
            }
        }
        if (type) {
            if (type !== 'all') {
                filterParams['type'] = type;
            } else {
                filterParams['type'] = '';
            }
        }
        this.getFilteredApprovalsFlowList(filterParams);
    }

    getFilteredApprovalsFlowList(filters) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/approval-flows';
        this.http.get(url, { params: filters,  responseType: 'text' }).toPromise().then((res) => {
            if (JSON.parse(res).code === 200) {
                this.setApprovalFlows(JSON.parse(res).approval, JSON.parse(res).total_approvals_flow);
            }
            if (JSON.parse(res).code !== 200) {
                this.setApprovalFlows([], 0);
            }
        });
    }

    handleSearch(key) {
        this.filteredApprovals = this.approvals.filter(item => {
            return item.title.toLowerCase().includes(key.toLowerCase())
                || item.department.toLowerCase().includes(key.toLowerCase());
        });
        this.dataSource = new MatTableDataSource(this.filteredApprovals);
    }
}
