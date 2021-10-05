import {Component, OnDestroy, OnInit} from '@angular/core';
import {Breadcrumb} from '../../../../../types/general';
import {ActivatedRoute} from '@angular/router';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';

@Component({
    selector: 'app-rfq-hire',
    templateUrl: './rfq-hire.component.html',
    styleUrls: ['./rfq-hire.component.scss']
})
export class RfqHireComponent implements OnDestroy {

    breadcrumb: Breadcrumb[];
    quotationDetails;
    show_alert = true;
    rfq_id: number;

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService) {
        const bidId = activatedRoute.snapshot.params.id;
        const rfqId = activatedRoute.snapshot.parent.parent.params.id;
        this.rfq_id = rfqId;
        this.initializeBreadCrumb(rfqId, bidId);
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);

        this.activatedRoute.data.subscribe(res => {
            console.log(res.rfqQuotation.bid);
            this.quotationDetails = res.rfqQuotation.bid;
        });
    }

    initializeBreadCrumb(rfqId: number, bidId: number) {
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
                title: 'All Biddings',
                path: `/dashboard/rfq/list/${rfqId}/biddings`
            },
            {
                title: 'Bidding Details',
                path: `/dashboard/rfq/list/${rfqId}/biddings/${bidId}`
            },
            {
                title: 'Hire',
                isActive: true
            }
        ];
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

}
