import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardResolveService } from '../../sheba/dashboard/dashboard-resolve.service';
import {NavLink} from '../../types/general';

@Component({
    selector: 'app-route-navigation-bar',
    templateUrl: './route-navigation-bar.component.html',
    styleUrls: ['./route-navigation-bar.component.scss']
})

export class RouteNavigationBarComponent implements OnDestroy, OnChanges {

    @Input() navigationLinks: NavLink[];
    @Input() routeNavHtml;
    open = false;
    sub: Subscription;
    hasHtml = false;

    constructor(private dashboardService: DashboardResolveService) {
        this.sub = this.dashboardService.DashboardBehavior.asObservable().subscribe(res => {
            this.open = res.open;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.routeNavHtml && changes.routeNavHtml.currentValue !== undefined) {
            this.hasHtml = true;
            return;
        }
        this.hasHtml = false;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
