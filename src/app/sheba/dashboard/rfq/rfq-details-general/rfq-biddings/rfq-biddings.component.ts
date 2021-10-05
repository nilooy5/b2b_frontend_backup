import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {Breadcrumb} from '../../../../../types/general';
import {MatTableDataSource} from '@angular/material';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-rfq-biddings',
    templateUrl: './rfq-biddings.component.html',
    styleUrls: ['./rfq-biddings.component.scss']
})

export class RfqBiddingsComponent implements OnDestroy {

    breadcrumb: Breadcrumb[];
    biddings: any[];
    rfq_id: number;
    show_biddings = false;
    dataSource: MatTableDataSource<any>;
    filteredBiddings: any[];
    sort_bidding: any = [
        {sort_column: 'sort_by_name', sort_type: 'asc'},
        {sort_column: 'sort_by_rating', sort_type: 'asc'},
        {sort_column: 'sort_by_price', sort_type: 'asc'},
    ];
    displayedColumns = ['vendorName', 'vendorMobile', 'ratings', 'type', 'quotation', 'actions'];

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService,
                private storage: StorageService,
                private http: ShebaHttpService,
                private router: Router) {

        const rfqId = activatedRoute.snapshot.parent.parent.params.id;
        console.log(activatedRoute.snapshot.parent);
        this.initializeBreadCrumb(rfqId);
        this.rfq_id = rfqId;
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);

        this.activatedRoute.data.subscribe(res => {
            this.setBiddingsList(res.rfqBiddingDetails.code, res.rfqBiddingDetails.bids);
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
                isActive: true
            }
        ];
    }

    setBiddingsList(response_code, biddings) {
        if (response_code === 200) {
            this.show_biddings = true;
            this.filteredBiddings = biddings;
            this.dataSource = new MatTableDataSource(this.filteredBiddings);
        } else {
            this.filteredBiddings = [];
            this.dataSource = new MatTableDataSource(this.filteredBiddings);
        }
    }

    sort(property) {
        this.sort_bidding.forEach((status) => {
            if (status.sort_column === property) {
                this.sortWithFilter(status.sort_column, status.sort_type);
                status.sort_type === 'asc' ? status.sort_type = 'desc' : status.sort_type = 'asc';
            }
        });
    }

    sortWithFilter(sort_column, sort_type) {
        const filterParams = {};
        filterParams[sort_column] = sort_type;
        this.getFilteredDetails(filterParams);
    }

    getFilteredDetails(filters) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.rfq_id + '/bid-history';
        this.http.get(url, {params: filters, responseType: 'text'}).toPromise().then((res) => {
            this.setBiddingsList(JSON.parse(res).code, JSON.parse(res).bids);
        });
    }

    redirectToHelp() {
        return environment.help_url + 'topics?type=business&type_id=' + this.storage.user.business_id;
    }

    redirectToInvite() {
        this.router.navigate(['/', 'dashboard', 'rfq', 'create', 'invite'], {state: { tenderId: this.rfq_id }});
    }

    redirectToQuotationDetails(bid_id) {
        const tenderID = this.rfq_id;
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', tenderID, 'biddings', bid_id]);
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
    }
}
