import {Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { Breadcrumb } from '../../types/general';
import { DashboardResolveService } from '../../sheba/dashboard/dashboard-resolve.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class BreadcrumbComponent implements OnChanges, OnDestroy {

    open = false;
    hasHtml = false;
    sub: Subscription;
    @Input() breadcrumbList: Breadcrumb[];
    @Input() htmlMarkup;

    constructor(private dashboardService: DashboardResolveService) {
        this.sub = this.dashboardService.DashboardBehavior.asObservable().subscribe(res => {
            this.open = res.open;
        });
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes.htmlMarkup && changes.htmlMarkup.currentValue !== undefined) {
            this.hasHtml = true;
            return;
        }
        this.hasHtml = false;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
