import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {StorageService} from '../../../../services/storage.service';
import {DashboardResolveService} from '../../dashboard-resolve.service';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-rfq-footer-help',
    templateUrl: './rfq-footer-help.component.html',
    styleUrls: ['./rfq-footer-help.component.scss']
})

export class RfqFooterHelpComponent implements OnInit, OnDestroy {

    toggleSubscription: Subscription;
    isSidebarOpen = false;

    constructor(private storage: StorageService,
                private dashboardService: DashboardResolveService) {
        this.toggleSubscription = this.dashboardService.DashboardBehavior.asObservable().subscribe((res) => {
            this.isSidebarOpen = res.open;
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.toggleSubscription.unsubscribe();
    }

    redirectToHelp() {
        return 'https://www.sheba.xyz/blog/bn/tender-submission-sbusiness/';
    }
}
