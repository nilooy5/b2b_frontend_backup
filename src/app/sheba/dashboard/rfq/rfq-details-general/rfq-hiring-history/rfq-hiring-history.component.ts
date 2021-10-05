import { Component, OnDestroy } from '@angular/core';
import { Breadcrumb } from '../../../../../types/general';
import {ActivatedRoute, Router} from '@angular/router';
import { DashboardSharedService } from '../../../../../services/dashboard-shared.service';
import {MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-rfq-hiring-history',
    templateUrl: './rfq-hiring-history.component.html',
    styleUrls: ['./rfq-hiring-history.component.scss']
})

export class RfqHiringHistoryComponent implements OnDestroy {

    breadcrumb: Breadcrumb[];
    rfq_id: number;
    hiring_histories: any[];
    show_history = false;
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['service_provider', 'date', 'quotation', 'requested', 'status', 'actions'];

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService,
                private router: Router) {
        const rfqId = activatedRoute.snapshot.parent.params.id;
        this.rfq_id = rfqId;
        this.initializeBreadCrumb(rfqId);
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);

        this.activatedRoute.data.subscribe(res => {
            console.log(res);
            this.hiring_histories = res.rfqHiringHistory.hiring_histories;
            if (this.hiring_histories.length) {
                this.setHiringHistory(this.hiring_histories);
            } else {
                this.setEmptyList();
            }
        });
    }

    initializeBreadCrumb(rfqId: number) {
        this.breadcrumb = [
            {
                title: 'List',
                path: '/dashboard/rfq/list'
            },
            {
                title: 'Tender Details',
                path: `/dashboard/rfq/list/${rfqId}/details`
            },
            {
                title: 'Hiring History',
                isActive: true
            }
        ];
    }

    setHiringHistory(hiringhistories) {
        this.show_history = true;
        this.dataSource = new MatTableDataSource(hiringhistories);
    }

    setEmptyList() {
        const set_data = [];
        this.dataSource = new MatTableDataSource(set_data);
    }

    redirectToBidding() {
        const tenderID = this.rfq_id;
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', tenderID, 'biddings']);
    }

    viewOrder(order_id) {
        const tenderID = this.rfq_id;
        this.router.navigate(['/', 'dashboard', 'rfq', 'orders', tenderID, 'details'], {queryParams: {bidId: order_id}});
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

}
