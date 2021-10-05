import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {User} from '../../../types/users';
import {DashboardResolveService} from '../../dashboard/dashboard-resolve.service';
import {Subscription} from 'rxjs';
import {StorageService} from '../../../services/storage.service';
import {WINDOW} from '@ng-toolkit/universal';
import {NotificationCountService} from '../../dashboard/notification-count.service';
declare const $crisp: any;

@Component({
    selector: 'app-dashboard-header',
    templateUrl: './dashboard-header.component.html',
    styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {
    @Output() logoutEvent: EventEmitter<any> = new EventEmitter();
    @Input() user: User;
    @Input() title: string;
    open = false;
    sub: Subscription;
    walletAmount = null;
    CanUserAccess = true;
    notify;
    unreadNotifications: any;

    constructor(
        private dashboardService: DashboardResolveService,
        private storage: StorageService,
        @Inject(WINDOW) private window,
        private notifyCount: NotificationCountService
    ) {
        this.sub = this.dashboardService.DashboardBehavior.asObservable().subscribe(res => {
            this.open = res.open;
        });

        const businessInfo = this.storage.getData('business_info');
        this.walletAmount = businessInfo ? businessInfo.wallet : null;

        this.CanUserAccess = !!this.storage.user.is_super;

        this.notifyCount.currentNotificationCount.subscribe((res) => {
            this.notify++;
            this.unreadNotifications++;
        });
    }

    ngOnInit() {

    }

    logout() {
        if (typeof this.window.$crisp !== 'undefined') {
            this.window.$crisp.push(['do', 'session:reset']);
            this.window.$crisp.push(['do', 'chat:hide']);
            this.window.$crisp = undefined;
        }
        this.logoutEvent.emit(true);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    notificationCount($event) {
        this.notify = $event;
        this.notify > 9 ? this.unreadNotifications = '9+' : this.unreadNotifications = this.notify;
    }
}
