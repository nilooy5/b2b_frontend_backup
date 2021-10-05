import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Breadcrumb } from '../../../../../types/general';
import { DashboardSharedService } from '../../../../../services/dashboard-shared.service';

@Component({
    selector: 'app-rfq-invite-confirmation',
    templateUrl: './rfq-invite-confirmation.component.html',
    styleUrls: ['./rfq-invite-confirmation.component.scss']
})

export class RfqInviteConfirmationComponent implements OnDestroy {

    breadcrumb: Breadcrumb[] = [
        {
            title: 'Tender',
            path: '/dashboard/rfq/create'
        },
        {
            title: 'Create New',
            path: `/dashboard/rfq/create`
        },
        {
            title: 'Invite',
            isActive: true
        }
    ];

    confirmationType: string;
    tenderId: string;

    constructor(private activatedRoute: ActivatedRoute,
                private dashboardSharedService: DashboardSharedService) {
        this.dashboardSharedService.changeBreadcrumb(true, this.breadcrumb);
        this.dashboardSharedService.changeHeaderTitle('Invite to your Tender');
        this.confirmationType = activatedRoute.snapshot.data.confirmationType;
        this.tenderId = activatedRoute.snapshot.queryParamMap.get('id');
    }

    ngOnDestroy() {
        this.dashboardSharedService.changeBreadcrumb(false);
        this.dashboardSharedService.changeHeaderTitle(null);
    }

}
