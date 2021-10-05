import {Component, OnDestroy, OnInit} from '@angular/core';
import { Breadcrumb } from '../../../../../../types/general';
import { ActivatedRoute } from '@angular/router';
import { DashboardSharedService } from '../../../../../../services/dashboard-shared.service';
import {MatTableDataSource} from '@angular/material/table';
import {environment} from '../../../../../../../environments/environment';
import {StorageService} from "../../../../../../services/storage.service";

@Component({
  selector: 'app-rfq-orders-workorder',
  templateUrl: './rfq-orders-workorder.component.html',
  styleUrls: ['./rfq-orders-workorder.component.scss']
})
export class RfqOrdersWorkorderComponent implements OnDestroy, OnInit {

    work_order: {
        from: any;
        grand_total: any;
        due: any;
        sub_total: any;
        terms: any;
        to: any;
        code: any;
    };
    dataSource: MatTableDataSource<any>;

    displayedColumns = ['title', 'short_description', 'unit', 'unit_price', 'total_price'];

    breadcrumb: Breadcrumb[];
    tenderId: string;
    bidId: string;

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService,
                private storage: StorageService) {
        this.initializeBreadCrumb();
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.activatedRoute.data.subscribe(res => {
            this.work_order = res.workorder;
            this.dataSource = new MatTableDataSource(res.workorder.items);
        });
    }

    initializeBreadCrumb() {
        this.tenderId = this.activatedRoute.snapshot.parent.params.id;
        this.bidId = this.activatedRoute.snapshot.queryParams.bidId;
        this.breadcrumb = [
            {
                title: 'Order List',
                path: '/dashboard/rfq/orders'
            },
            {
                title: 'Order Details',
                path: `/dashboard/rfq/orders/${this.tenderId}/details`,
                queryParams: { bidId: this.bidId }
            },
            {
                title: 'Workorder',
                isActive: true
            }
        ];
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

    ngOnInit() {
    }

    downloadWorkorder() {
        window.location.href = environment.api_url + '/v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.tenderId + '/bids/' + this.bidId + '/work-order/download?token=' + this.storage.user.token;
    }

}
