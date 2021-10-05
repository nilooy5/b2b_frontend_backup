import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {MatTableDataSource} from '@angular/material/table';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-leave-balance-details',
    templateUrl: './leave-balance-details.component.html',
    styleUrls: ['./leave-balance-details.component.scss']
})
export class LeaveBalanceDetailsComponent implements OnInit {
    leave_balance_details: any;
    leave_balance: any;
    dataSource: MatTableDataSource<any>;
    noDataSource: MatTableDataSource<any>;
    noLeaveData = [
        {description: 'No Leave Balance Available'}
    ];

    displayedColumns = ['date', 'leave_type', 'leave_days', 'status', 'actions'];
    noLeaveColumns = ['description'];

    constructor(private route: ActivatedRoute,
                private storage: StorageService,
                private http: ShebaHttpService,
                private router: Router) {
        this.route.data.subscribe(({leaveBalanceDetailsResolver}) => {
            const {leave_balance_details} = leaveBalanceDetailsResolver;
            this.leave_balance_details = leave_balance_details;
            this.leave_balance = leave_balance_details.leave_balance;
            this.dataSource = new MatTableDataSource(leave_balance_details.leaves);
        });
    }

    ngOnInit() {
        this.noDataSource = new MatTableDataSource(this.noLeaveData);
    }

    redirectToLeaveRequestDetails(leaves) {
        if (leaves.request.has_access) {
            this.router.navigate(['/', 'dashboard', 'leave', 'requests', leaves.request.id]).then();
        }
    }

    getStatus(status) {
        switch (status) {
            case 'approved': return 'status--accepted';
            case 'pending': return 'status--pending';
            case 'rejected': return 'status--rejected';

        }

    }

    downloadPDF(employeeID) {
        window.location.href = environment.api_url + '/v2/businesses/' + this.storage.user.business_id + '/leaves/balance/' + employeeID + '?file=pdf&token=' + this.storage.user.token;
    }
}
