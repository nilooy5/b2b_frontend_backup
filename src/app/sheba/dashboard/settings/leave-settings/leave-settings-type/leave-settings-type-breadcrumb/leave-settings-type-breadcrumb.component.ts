import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {Breadcrumb} from '../../../../../../types/general';
import {DashboardResolveService} from '../../../../dashboard-resolve.service';

@Component({
    selector: 'app-leave-settings-type-breadcrumb',
    templateUrl: './leave-settings-type-breadcrumb.component.html',
    styleUrls: ['./leave-settings-type-breadcrumb.component.scss']
})
export class LeaveSettingsTypeBreadcrumbComponent implements OnDestroy {

    @Input() dataSource;
    @Input() disableButton: boolean;
    @Output() createNewRow = new EventEmitter();

    isSidebarClosed = false;
    sidebarSubscription: Subscription;

    breadcrumbList: Breadcrumb[] = [
        {
            title: 'Settings',
            path: '/dashboard/settings'
        },
        {
            title: 'Leave',
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

    addNewRow() {
        this.createNewRow.emit(this.dataSource);
    }


}
