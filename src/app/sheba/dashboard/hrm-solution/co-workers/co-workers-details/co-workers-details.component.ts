import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { DashboardSharedService } from '../../../../../services/dashboard-shared.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Breadcrumb } from '../../../../../types/general';
import {BasicInfo} from '../../../../../types/co-workers';

@Component({
    selector: 'app-co-workers-details',
    templateUrl: './co-workers-details.component.html',
    styleUrls: ['./co-workers-details.component.scss']
})

export class CoWorkersDetailsComponent implements OnInit, OnDestroy {

    headerInfo: { image: string; name: string; status: string };

    breadcrumb: Breadcrumb[] = [
        {
            title: 'Co-Workers List',
            path: '/dashboard/co-workers'
        },
        {
            title: 'Co-Worker Details',
            isActive: true
        }
    ];

    currentActivatedRoute: string;
    coworkerId: number;

    constructor(private dashboardSharedService: DashboardSharedService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
        this.dashboardSharedService.changeHeaderTitle('Co-Worker Details');

        this.activatedRoute.data.subscribe(({ coWorkerDetails }) => {
            this.coworkerId = coWorkerDetails.basic_info.id;
            this.initializeHeaderInfo(coWorkerDetails.basic_info);
        });
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.splitRouterUrl();
    }

    ngOnInit() {
    }

    splitRouterUrl() {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                const journeyState = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
                this.currentActivatedRoute = journeyState.split('?')[0];
            }
        });
    }

    initializeHeaderInfo(basicInfo: BasicInfo) {
        this.headerInfo = {
            image: basicInfo.profile.profile_picture,
            name: basicInfo.profile.name,
            status: basicInfo.status
        };
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
        this.dashboardSharedService.changeHeaderTitle(null);
    }

    redirectToCoWorkerAdd() {
        this.router.navigate(['/', 'dashboard', 'co-workers', 'add', this.currentActivatedRoute], {queryParams: { coworkerId: this.coworkerId}}).then();
    }
}
