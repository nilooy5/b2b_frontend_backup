import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-procurement-orders-details',
    templateUrl: './procurement-orders-details.component.html',
    styleUrls: ['./procurement-orders-details.component.scss']
})

export class ProcurementOrdersDetailsComponent implements OnInit {

    activeTabIndex = 0;
    orderDetail: any;
    currentUrl: any;
    tabLinks: any[];
    orderId: any;

    constructor(private route: ActivatedRoute,
                private router: Router) {

        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.currentUrl = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
                this.currentUrl = this.currentUrl.split('?')[0];
                this.currentTabSelected(this.currentUrl);
            }
        });

        this.route.data.subscribe(res => this.orderDetail = res.procurementOrdersDetails);

        this.orderId = this.route.snapshot.params.order_id;
        this.matTabLinks();

    }

    ngOnInit() { }

    matTabLinks() {
        this.tabLinks = [
            {
                label: 'Detail',
                link: ['/', 'dashboard', 'procurement', 'orders', this.orderId],
                queryParams: this.orderDetail.bid_id,
                index: 0
            },
            {
                label: 'Bill',
                link: ['/', 'dashboard', 'procurement', 'orders', this.orderId, 'bill'],
                queryParams: this.orderDetail.bid_id,
                index: 1
            },
            {
                label: 'Vendor',
                link: ['/', 'dashboard', 'procurement', 'orders', this.orderId, 'vendor'],
                queryParams: this.orderDetail.bid_id,
                index: 2
            },
            {
                label: 'Workorder' ,
                link: ['/', 'dashboard', 'procurement', 'orders', this.orderId, 'workorder'],
                queryParams: this.orderDetail.bid_id,
                index: 3
            },
            {
                label: 'Timeline',
                link: ['/', 'dashboard', 'procurement', 'orders', this.orderId, 'timeline'],
                queryParams: this.orderDetail.bid_id,
                index: 4
            }
        ];
    }

    currentTabSelected(data) {
        switch (data) {
            case 'bill': {
                this.activeTabIndex = 1;
                break;
            }
            case 'vendor': {
                this.activeTabIndex = 2;
                break;
            }
            case 'workorder': {
                this.activeTabIndex = 3;
                break;
            }
            case 'timeline': {
                this.activeTabIndex = 4;
                break;
            }
            default: {
                this.activeTabIndex = 0;
                break;
            }
        }
    }

    getOrderStatusCSSClass(status) {

        let statusCSSClass = '';

        switch (status) {
            case 'accepted':
                statusCSSClass = 'accepted';
                break;
            case 'started':
                statusCSSClass = 'started';
                break;
            case 'served':
                statusCSSClass = 'served';
                break;
            case 'cancelled':
                statusCSSClass = 'cancelled';
                break;
        }

        return statusCSSClass;

    }

}
