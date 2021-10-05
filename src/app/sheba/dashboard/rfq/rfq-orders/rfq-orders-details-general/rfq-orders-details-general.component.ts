import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavLink} from '../../../../../types/general';
import {DashboardSharedService} from '../../../../../services/dashboard-shared.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {DashboardResolveService} from '../../../dashboard-resolve.service';

@Component({
    selector: 'app-rfq-orders-details-general',
    templateUrl: './rfq-orders-details-general.component.html',
    styleUrls: ['./rfq-orders-details-general.component.scss']
})
export class RfqOrdersDetailsGeneralComponent implements OnInit, OnDestroy {

    toggleSubscription: Subscription;
    isSidebarOpen = false;
    navLinks: NavLink[];
    tenderId: string;
    order: any;
    bidId: number;


    constructor( private activatedRoute: ActivatedRoute,
                 private dashboardSharedService: DashboardSharedService,
                 private dashboardService: DashboardResolveService) {
        this.activatedRoute.data.subscribe(res => {
            this.bidId = res.rfqOrderDetails.bid_id;
            this.setTenderOrderDetails(res.rfqOrderDetails);
        });
        this.setDashboardHeader();
        this.toggleSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe((res) => {
            this.isSidebarOpen = res.open;
        });
        this.initializeNavigationLinks();
    }

    ngOnInit() { }

    setDashboardHeader() {
        this.dashboardSharedService.changeHeaderTitle('Tender Order Details');
    }

    initializeNavigationLinks() {
        this.tenderId = this.activatedRoute.snapshot.params.id;
        this.navLinks = [
            {
                label: 'Details',
                path: `/dashboard/rfq/orders/${this.tenderId}/details`,
                queryParams: { bidId: this.bidId}
            },
            {
                label: 'Bill',
                path: `/dashboard/rfq/orders/${this.tenderId}/bill`,
                queryParams: { bidId: this.bidId}
            },
            {
                label: 'Workorder',
                path: `/dashboard/rfq/orders/${this.tenderId}/workorder`,
                queryParams: { bidId: this.bidId}
            },
            {
                label: 'Timeline',
                path: `/dashboard/rfq/orders/${this.tenderId}/timeline`,
                queryParams: { bidId: this.bidId}
            }
        ];

        this.dashboardSharedService.changeRouteNavigation(true, this.navLinks);
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeRouteNavigation(false);
        this.dashboardSharedService.changeHeaderTitle(null);
        this.toggleSubscription.unsubscribe();
    }

    setTenderOrderDetails(item) {
        this.order = item;
    }

    getStatusColor(status) {
        switch (status) {
            case 'Accepted': return 'orderStatus--accepted';
            case 'Process': return 'orderStatus--process';
            case 'Served': return 'orderStatus--served';
            case 'Cancelled': return 'orderStatus--cancelled';
        }
    }

}
