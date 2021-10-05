import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-procurement-tender-detail-bids',
    templateUrl: './procurement-tender-detail-bids.component.html',
    styleUrls: ['./procurement-tender-detail-bids.component.scss']
})
export class ProcurementTenderDetailBidsComponent implements OnInit {

    tabVisible = true;
    currentRoute;
    navLinks: any[];
    activeLinkIndex = 0;
    procurementId: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.router.events.subscribe(e => {
            if (e instanceof  NavigationEnd) {
                this.currentRoute = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
                this.currentRoute = this.currentRoute.split('?')[0];
                if (this.currentRoute === 'messaging') {
                    this.tabVisible = false;
                } else {
                    this.tabVisible = true;
                }

                this.activeLinkIndex = this.currentRoute === 'history' ? 1 : 0;
            }
        });

        this.procurementId = this.route.snapshot.params.procurement_id;
        this.navLinks = [
            {
                label: 'Bid',
                link: ['/', 'dashboard', 'procurement', this.procurementId],
                index: 0
            },
            {
                label: 'History',
                link: ['/', 'dashboard', 'procurement', this.procurementId, 'history'],
                index: 1
            }
        ];
    }

    ngOnInit() {
    }

}
