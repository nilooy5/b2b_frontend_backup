import { Component, OnDestroy } from '@angular/core';
import { Breadcrumb } from '../../../../../types/general';
import {ActivatedRoute } from '@angular/router';
import { DashboardSharedService } from '../../../../../services/dashboard-shared.service';
import {StorageService} from '../../../../../services/storage.service';
import {RfqCompareService} from '../../rfq-services/rfq-details-services/rfq-compare.service';
import {Subscription} from 'rxjs';
import {RfqBid} from '../../../../../types/rfq';

@Component({
    selector: 'app-rfq-comparison',
    templateUrl: './rfq-comparison.component.html',
    styleUrls: ['./rfq-comparison.component.scss']
})

export class RfqComparisonComponent implements OnDestroy {

    rfqId: string;
    breadcrumb: Breadcrumb[];
    bidsDetails;

    constructor(private activatedRoute: ActivatedRoute,
                private storage: StorageService,
                private rfqCompareService: RfqCompareService,
                private dashboardSharedService: DashboardSharedService) {
        this.rfqId = activatedRoute.snapshot.parent.params.id;
        this.initializeBreadCrumb(this.rfqId);
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        activatedRoute.data.subscribe(({ bidsDetails }) => {
            this.bidsDetails = bidsDetails;
        });
    }

    initializeBreadCrumb(rfqId: string) {
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
                title: 'Compare',
                isActive: true
            }
        ];
    }


    updateBidsList(bidsDetails: RfqBid[]) {
        this.bidsDetails = bidsDetails;
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }
}
