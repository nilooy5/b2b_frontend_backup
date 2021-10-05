import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {DashboardResolveService} from '../../../../dashboard-resolve.service';
import {Breadcrumb} from '../../../../../../types/general';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-office-settings-holiday-breadcrumb',
    templateUrl: './office-settings-holiday-breadcrumb.component.html',
    styleUrls: ['./office-settings-holiday-breadcrumb.component.scss']
})
export class OfficeSettingsHolidayBreadcrumbComponent implements OnDestroy {

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
            title: 'Office Settings',
            path: '/dashboard/settings/office/holiday'
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
