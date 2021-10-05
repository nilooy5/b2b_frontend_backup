import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breadcrumb } from '../../../../../types/general';
import { DashboardResolveService } from '../../../dashboard-resolve.service';

@Component({
    selector: 'app-rfq-list-breadcrumb',
    templateUrl: './rfq-list-breadcrumb.component.html',
    styleUrls: ['./rfq-list-breadcrumb.component.scss']
})

export class RfqListBreadcrumbComponent implements OnDestroy {

    isSidebarClosed = false;
    sidebarSubscription: Subscription;

    breadcrumbList: Breadcrumb[] = [
        {
            title: 'Tenders',
            path: '/dashboard/rfq/list'
        },
        {
            title: 'List',
            isActive: true
        }
    ];

    constructor(private dashboardService: DashboardResolveService) {

        this.sidebarSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe(res => {
            this.isSidebarClosed = res.open;
        });
    }

    ngOnDestroy() {
        this.sidebarSubscription.unsubscribe();
    }

}
