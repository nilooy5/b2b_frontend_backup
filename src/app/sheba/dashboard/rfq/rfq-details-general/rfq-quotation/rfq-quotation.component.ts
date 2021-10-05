import {Component, OnDestroy, OnInit} from '@angular/core';
import {Breadcrumb} from '../../../../../types/general';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {MatTableDataSource} from '@angular/material';
import {environment} from '../../../../../../environments/environment';
import {StorageService} from '../../../../../services/storage.service';

@Component({
    selector: 'app-rfq-quotation',
    templateUrl: './rfq-quotation.component.html',
    styleUrls: ['./rfq-quotation.component.scss']
})

export class RfqQuotationComponent implements OnDestroy {

    breadcrumb: Breadcrumb[];
    quotationDetails;
    rfq_id: number;
    bid_id: number;
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['sl_no', 'item', 'specifications', 'unit', 'price'];
    can_show_hire;

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService,
                private router: Router,
                private storage: StorageService) {
        const rfqId = activatedRoute.snapshot.parent.parent.params.id;
        this.rfq_id = rfqId;
        this.initializeBreadCrumb(rfqId);
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);

        this.activatedRoute.data.subscribe(res => {
            console.log(res.rfqQuotation.bid);
            this.quotationDetails = res.rfqQuotation.bid;
            this.setPriceQuotations(res.rfqQuotation.bid.price_quotation);
            this.bid_id = this.quotationDetails.id;
            this.setStatusLogic();
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
                title: 'All Biddings',
                path: `/dashboard/rfq/list/${rfqId}/biddings`
            },
            {
                title: 'Bidding Details',
                isActive: true
            }
        ];
    }

    setPriceQuotations(price_quotations) {
        this.dataSource = new MatTableDataSource(price_quotations);
    }

    setStatusLogic() {
        const status = this.quotationDetails.procurement_status === 'Hired' || this.quotationDetails.procurement_status === 'Closed';
        this.can_show_hire = this.quotationDetails.is_awarded || status;
    }

    getTotalPrice() {
        const quotationList = this.quotationDetails.price_quotation;
        let subtotalPrice = 0;
        subtotalPrice = quotationList.map(t => +t.result).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
        return subtotalPrice;
    }

    goToHire() {
        const tenderID = this.rfq_id;
        const bidID = this.bid_id;
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', tenderID, 'biddings', bidID, 'hire']);
    }

    downloadQuote() {
        return environment.api_url + 'v2/businesses/' + this.storage.user.business_id
            + '/bids/' + this.bid_id + '/download?token=' + this.storage.user.token;
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }

}
