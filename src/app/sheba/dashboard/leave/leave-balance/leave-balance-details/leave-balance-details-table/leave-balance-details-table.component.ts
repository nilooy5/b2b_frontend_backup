import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

@Component({
    selector: 'app-leave-balance-details-table',
    templateUrl: './leave-balance-details-table.component.html',
    styleUrls: ['./leave-balance-details-table.component.scss']
})
export class LeaveBalanceDetailsTableComponent implements OnInit {
    @Input() leaveBalanceTable;
    dataSource: MatTableDataSource<any>;
    noDataSource: MatTableDataSource<any>;
    noLeaveData = [
        {description: 'No Leave Balance Available'}
    ];

    displayedColumns = ['date', 'leave_type', 'leave_days', 'approvalStatus', 'status', 'actions'];
    noLeaveColumns = ['description'];

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.leaveBalanceTable.leaves);
        this.noDataSource = new MatTableDataSource(this.noLeaveData);
    }

    redirectToLeaveRequestDetails(leaves) {
        if (leaves.request.has_access) {
            this.router.navigate(['/', 'dashboard', 'leave', 'requests', leaves.request.id]).then();
        }
    }

    getStatus(status) {
        switch (status) {
            case 'pending': return 'reqStatus';
            case 'approved': return 'reqStatus reqStatus--accepted';
            case 'rejected': return 'reqStatus reqStatus--rejected';

        }
    }

}
