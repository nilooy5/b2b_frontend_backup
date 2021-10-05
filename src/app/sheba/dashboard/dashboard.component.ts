import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {ActivatedRoute, ActivationEnd, NavigationStart, Router} from '@angular/router';
import {PopAlertService} from '../../modules/pop-alert/pop-alert.service';
import {User} from '../../types/users';
import {of, Subscription} from 'rxjs';
import {CompanyService} from './company/company.service';
import {CompanyUpdateComponent} from './company/company-update/company-update.component';
import {DashboardResolveService} from './dashboard-resolve.service';
import {delay} from 'rxjs/operators';
import {DashboardSideBarComponent} from './dashboard-side-bar/dashboard-side-bar.component';
import {AmplitudeService} from '../../services/amplitude.service';
import {NotificationCountService} from './notification-count.service';
import {NotificationsService} from './notifications/notifications.service';
import {environment} from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { DashboardSharedService } from '../../services/dashboard-shared.service';
import {Breadcrumb, NavLink, SettingsItem} from '../../types/general';
import io from 'socket.io-client';

const socket = io(environment.socket_url);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
    open: boolean;
    user: User;
    sub: Subscription;
    title: string;
    private window: any = window;
    @ViewChild('dashboardSideBarComponent') sidebar: DashboardSideBarComponent;

    showNotification = false;
    notificationContent: any;

    showBreadcrumb = false;
    breadcrumbSubscription$: Subscription;
    breadCrumb: Breadcrumb[];
    htmlMarkup: any;
    routeNavHtml: any;


    routeNavigationSubscription$: Subscription;
    showNavigation = false;
    navLinks: NavLink[];

    showBetterExperienceModal = false;

    headerSubscription$: Subscription;

    featureSettingsSubscription$: Subscription;
    showFeatureSettings = false;
    settingsItems: SettingsItem[];
    settingsTitle: string;

    constructor(
        private storage: StorageService,
        private router: Router,
        private pop: PopAlertService,
        private route: ActivatedRoute,
        private companyService: CompanyService,
        private dashboardService: DashboardResolveService,
        private notificationService: NotificationsService,
        private sanitizer: DomSanitizer,
        private dashboardSharedService: DashboardSharedService,
        private notifyCount: NotificationCountService,
        private amplitude: AmplitudeService
    ) {
        this.open = true;
        this.sub = this.storage.user$.subscribe(res => {
            if (!res || typeof res === 'undefined') {
                this.router.navigate(['/']).catch(err => {
                    console.log(res);
                });
                this.pop.open('You have been logged out !!');
            } else {
                if (!this.user) {
                    this.user = res;
                }
            }
        });
        // this.router.events.subscribe(e => {
        //     if (e instanceof NavigationStart) {
        //         this.title = '';
        //     }
        //     if (e instanceof ActivationEnd) {
        //         if (e.snapshot.routeConfig.data) {
        //             this.title = e.snapshot.routeConfig.data.name;
        //         }
        //         if (e.snapshot.routeConfig.data && e.snapshot.routeConfig.data.comingSoon) {
        //             this.sidebar.handleComingSoon();
        //         }
        //     }
        // });

        if (this.storage.user !== null) {
            this.notificationListener();
        }

        this.headerSubscription$ = this.dashboardSharedService.currentHeaderTitle.subscribe((title) => this.title = title);

        this.breadcrumbSubscription$ = this.dashboardSharedService.currentBreadcrumb.subscribe((res) => {
            const { showBreadcrumb, breadcrumb, htmlMarkup } = res;
            this.showBreadcrumb = showBreadcrumb;
            this.breadCrumb = breadcrumb;
            if (htmlMarkup) { this.htmlMarkup = this.sanitizer.bypassSecurityTrustHtml(htmlMarkup); }
        });

        this.routeNavigationSubscription$ = this.dashboardSharedService.currentRouteNavigation.subscribe((res) => {
            const { showNavigation, navLinks, htmlMarkup } = res;
            this.showNavigation = showNavigation;
            this.navLinks = navLinks;
            if (htmlMarkup) { this.routeNavHtml = this.sanitizer.bypassSecurityTrustHtml(htmlMarkup); }
        });

        // this.amplitude.fireAmplitudePageViewEvent({ path: this.router.url });

        // Better Experience Modal in Mobile View
        this.showBetterExperienceModal = window.matchMedia('(max-width: 768px)').matches;

        this.featureSettingsSubscription$ = this.dashboardSharedService.currentFeatureSettings.subscribe((res) => {
            const { showFeatureSettings, settingsTitle, settingsItems } = res;
            this.showFeatureSettings = showFeatureSettings;
            this.settingsTitle = settingsTitle;
            this.settingsItems = settingsItems;
        });
    }

    ngOnInit() {
        this.route.data.subscribe((res) => {
            if (!res.user && this.storage.user) {
                of(res.user).pipe(delay(500)).toPromise().then((response) => {
                    this.companyService.showUpdater(CompanyUpdateComponent).afterClosed().subscribe((company) => {
                        if (company) {
                            this.dashboardService.setProfile();
                        }
                    });
                });
            }
        });
    }

    logout() {
        this.storage.removeData();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
        this.breadcrumbSubscription$.unsubscribe();
        this.routeNavigationSubscription$.unsubscribe();
        this.headerSubscription$.unsubscribe();
        this.featureSettingsSubscription$.unsubscribe();
    }

    toggleDashboard() {
        this.open = !this.open;
        this.dashboardService.DashboardBehavior.next({open: this.open});
    }

    notificationListener() {
        socket.on('notification-channel:Sheba\\Notification\\NotificationCreated', (data) => {
            this.showNotification = true;
            this.notifyCount.changeNotificationCount(data);
            setTimeout(() => {
                this.showNotification = false;
            }, 12000);
            console.log(data);
            this.notificationContent = data;
        });
        socket.emit('login', { name: this.storage.user.name, id: this.storage.user.member_id, type: 'App\\Models\\Member' });
    }

    clearNotification() {
        this.showNotification = false;
    }

    onClickNotification(notification) {
        this.window.open(notification.link);
        this.notifyCount.changeNotificationSeenStatus(notification.id);
    }

    applyMargin() {
        if ( this.router.url.includes('/dashboard/leave/')
            || this.router.url.includes('/dashboard/fleet-management/requests')
            || this.router.url.includes('/dashboard/fleet-management/inspection/ongoing')
            || this.router.url.includes('/dashboard/fleet-management/submit-inspection/schedule')) {
            return {
                'margin-top': '40px'
            };
        }
        return {
            'margin-top': '0'
        };
    }
}
