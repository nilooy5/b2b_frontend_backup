import { Component, OnDestroy } from '@angular/core';
import { Breadcrumb } from '../../../../../../types/general';
import { ActivatedRoute } from '@angular/router';
import { DashboardSharedService } from '../../../../../../services/dashboard-shared.service';

@Component({
    selector: 'app-rfq-orders-details',
    templateUrl: './rfq-orders-details.component.html',
    styleUrls: ['./rfq-orders-details.component.scss']
})

export class RfqOrdersDetailsComponent implements OnDestroy {

    breadcrumb: Breadcrumb[];
    tenderId: string;
    bidId: string;
    order: any;

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService) {
        this.initializeBreadCrumb();
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.activatedRoute.data.subscribe(res => {
            this.setRfqOrderDetails(res.rfqOrderDetails);
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
                title: 'Details',
                isActive: true
            }
        ];
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

    setRfqOrderDetails(item) {
        this.order = item;
        console.log(this.order);
    }

}
