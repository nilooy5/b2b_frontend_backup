import {Component, OnDestroy, OnInit} from '@angular/core';
import {Breadcrumb} from '../../../../../../types/general';
import {ActivatedRoute} from '@angular/router';
import {DashboardSharedService} from '../../../../../../services/dashboard-shared.service';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
    selector: 'app-rfq-orders-bill',
    templateUrl: './rfq-orders-bill.component.html',
    styleUrls: ['./rfq-orders-bill.component.scss']
})
export class RfqOrdersBillComponent implements OnDestroy, OnInit {

    breadcrumb: Breadcrumb[];
    billClearUrl: string;
    tenderId: string;
    bidId: string;
    orderBill;
    showPaymentOptions = false;
    billPayments;

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService,
                private storage: StorageService) {
        this.activatedRoute.data.subscribe(res => {
            this.orderBill = res.orderBill;
            this.billPayments = res.billPayments;
        });
        this.initializeBreadCrumb();
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
    }

    ngOnInit() {
        this.billClearUrl = 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.tenderId + '/bills/clear';
    }

    onClickPayBill() {
        this.showPaymentOptions = true;
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
                queryParams: {bidId: this.bidId}
            },
            {
                title: 'Bill',
                isActive: true
            }
        ];
    }

    setNewBillOrder(event) {
        this.orderBill = event;
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }
}
