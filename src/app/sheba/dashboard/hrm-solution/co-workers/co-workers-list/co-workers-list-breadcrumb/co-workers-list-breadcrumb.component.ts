import {Component, OnDestroy} from '@angular/core';
import {DashboardResolveService} from '../../../../dashboard-resolve.service';
import {Subscription} from 'rxjs';
import {Breadcrumb} from '../../../../../../types/general';
import {MatDialog} from '@angular/material';
import {DialogInviteCoWorkerComponent} from '../../modals/dialog-invite-co-worker/dialog-invite-co-worker.component';

@Component({
    selector: 'app-co-workers-list-breadcrumb',
    templateUrl: './co-workers-list-breadcrumb.component.html',
    styleUrls: ['./co-workers-list-breadcrumb.component.scss']
})

export class CoWorkersListBreadcrumbComponent implements OnDestroy {

    isSidebarClosed = false;
    sidebarSubscription: Subscription;

    breadcrumbList: Breadcrumb[] = [
        {
            title: 'Co-Workers',
            path: '/dashboard/co-workers'
        },
        {
            title: 'Co-Workers List',
            isActive: true
        }
    ];

    constructor(private dashboardService: DashboardResolveService,
                public dialog: MatDialog) {

        this.sidebarSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe(res => {
            this.isSidebarClosed = res.open;
        });
    }

    ngOnDestroy() {
        this.sidebarSubscription.unsubscribe();
    }

    inviteCoWorker() {
        this.openDialog();
    }

    openDialog() {
        const dialogRef = this.dialog.open(DialogInviteCoWorkerComponent, {
            width: '670px',
            height: '420px',
            data: {
                message: 'Are you sure you want to invite these co-workers?',
                icon: '/assets/svg/confirm.svg',
                button_1: 'No',
                button_2: 'Yes',
                type: 'Confirm'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                //  this.getCoworkerRequestsStatusResponse('invited');
            }
        });
    }
}
