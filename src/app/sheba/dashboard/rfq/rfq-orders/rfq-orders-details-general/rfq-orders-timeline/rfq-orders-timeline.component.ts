import { Component, OnDestroy } from '@angular/core';
import { Breadcrumb } from '../../../../../../types/general';
import { ActivatedRoute } from '@angular/router';
import { DashboardSharedService } from '../../../../../../services/dashboard-shared.service';

@Component({
  selector: 'app-rfq-orders-timeline',
  templateUrl: './rfq-orders-timeline.component.html',
  styleUrls: ['./rfq-orders-timeline.component.scss']
})

export class RfqOrdersTimelineComponent implements OnDestroy {

    breadcrumb: Breadcrumb[];
    tenderId: string;
    bidId: string;
    orderTimeline;

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService) {
        this.initializeBreadCrumb();
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.activatedRoute.data.subscribe(res => this.orderTimeline = res.orderTimeline);
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
                title: 'Timeline',
                isActive: true
            }
        ];
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

}
