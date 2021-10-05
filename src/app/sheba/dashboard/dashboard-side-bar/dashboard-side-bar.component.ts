import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {StorageService} from '../../../services/storage.service';
import {ComingSoonComponent} from '../../modals/coming-soon/coming-soon.component';
import {NavLink} from '../../../types/general';
import {DomSanitizer} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {JwtService} from '../../../services/jwt.service';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-dashboard-side-bar',
    templateUrl: './dashboard-side-bar.component.html',
    styleUrls: ['./dashboard-side-bar.component.scss']
})

export class DashboardSideBarComponent implements OnInit, OnChanges {
    @Input() navLinks: NavLink[];
    @Input() open = true;
    current_path: string;
    // tslint:disable-next-line:variable-name
    CanUserAccess = true;
    showChildRoutes = true;

    icons = [
        {name: 'dashboard'},
        {name: 'quick_purchase'},
        {name: 'orders'},
        {name: 'vendors'},
        {name: 'settings'},
        {name: 'procurement'},
        {name: 'fleet'},
        {name: 'co_worker'},
        {name: 'bill'},
        {name: 'support'},
        {name: 'announcements'},
    ];
    showContent: boolean;

    constructor(
        public router: Router,
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
        private storage: StorageService,
        private dialog: MatDialog,
        private jwt: JwtService
    ) {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.current_path = e.urlAfterRedirects;
            }
        });
        this.icons.forEach((item) => {
            iconRegistry.addSvgIcon(
                'icon_' + item.name, sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/icons/icon_' + item.name + '.svg'));
        });
        this.showContent = true;
        this.CanUserAccess = this.storage.user.is_super ? !!this.storage.user.is_super : false;
    }

    ngOnInit() {
        this.storage.userWatcher.asObservable().subscribe((res) => {
            if (this.storage.user) {
                this.CanUserAccess = !!this.storage.user.is_super;
            }
            this.setupNavLinks();
        });

        if (!this.navLinks) {
            this.setupNavLinks();
        }
    }

    ngOnChanges(changes: SimpleChanges) {

        this.handleChildItemsOnNavCollapse(changes.open.currentValue);

    }

    handleChildItemsOnNavCollapse(open) {
        open ? setTimeout(() => {
            this.showChildRoutes = true;
        }, 500) : this.showChildRoutes = false;
    }

    setupNavLinks() {
        this.navLinks = [
            {
                label: 'Tender',
                path: '/dashboard/rfq',
                icon: 'procurement',
                badge: 'NEW',
                userAccess: this.CanUserAccess,
                children: [
                    {
                        label: 'Create new Tender',
                        path: '/dashboard/rfq/create',
                        icon: 'icon_setting',
                        userAccess: this.CanUserAccess,
                    },
                    {
                        label: 'Tender List',
                        path: '/dashboard/rfq/list',
                        icon: 'icon_setting',
                        userAccess: this.CanUserAccess,
                    },
                ]
            },
            {
                label: 'Facility',
                path: '/dashboard/quick-purchase',
                icon: 'quick_purchase',
                badge: '',
                userAccess: true,
                children: [
                    {
                        label: 'Quick Purchase',
                        path: '/dashboard/quick-purchase',
                        icon: 'quick_purchase',
                        userAccess: true,
                    },
                    {
                        label: 'Subscription',
                        path: '/dashboard/order/subscription',
                        icon: 'quick_purchase',
                        userAccess: this.CanUserAccess,
                    },
                ]
            },
            {
                label: 'Orders',
                path: '/dashboard/rfq/orders',
                icon: 'orders',
                badge: '',
                userAccess: true,
                children: [
                    {
                        label: 'Tender',
                        path: '/dashboard/rfq/orders',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Service',
                        path: '/dashboard/orders',
                        icon: 'icon_setting',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Subscriptions',
                        path: '/dashboard/subscriptions',
                        icon: 'icon_setting',
                        userAccess: this.CanUserAccess
                    }
                ]
            },
            {
                label: 'Vendors',
                path: '/dashboard/vendors',
                icon: 'vendors',
                badge: '',
                userAccess: this.CanUserAccess
            },
            {
                label: 'Fleet Management',
                path: '/dashboard/fleet-management',
                icon: 'fleet',
                badge: '',
                userAccess: true,
                children: [
                    {
                        label: 'Vehicle',
                        path: '/dashboard/fleet-management/vehicle',
                        icon: 'icon_setting',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Driver',
                        path: '/dashboard/fleet-management/drivers',
                        icon: 'icon_setting',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Trip Requests',
                        path: '/dashboard/fleet-management/requests',
                        userAccess: true
                    },
                    {
                        label: 'Trip Assignments',
                        path: '/dashboard/fleet-management/assignments',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Trip Calendar',
                        path: '/dashboard/fleet-management/trip-calendar',
                        userAccess: true
                    },
                    {
                        label: 'Vehicle Inspection',
                        path: '/dashboard/fleet-management/inspection',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Schedule Inspection',
                        path: '/dashboard/fleet-management/submit-inspection',
                        userAccess: true
                    },
                    {
                        label: 'Vehicle Issues',
                        path: '/dashboard/fleet-management/issue',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Fuel Management',
                        path: '/dashboard/fleet-management/fuel',
                        userAccess: this.CanUserAccess
                    }
                ]
            },
            {
                label: 'HRM Solution',
                path: '/dashboard/attendance',
                icon: 'co_worker',
                badge: '',
                userAccess: this.CanUserAccess,
                children: [
                    {
                        label: 'Attendance',
                        path: '/dashboard/attendance',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Expense',
                        path: '/dashboard/expense',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Leave',
                        path: '/dashboard/leave',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Announcements',
                        path: '/dashboard/announcements',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Support',
                        path: '/dashboard/support',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Co Workers',
                        path: '/dashboard/co-workers',
                        userAccess: this.CanUserAccess
                    },
                    {
                        label: 'Departments',
                        path: '/dashboard/departments',
                        userAccess: this.CanUserAccess
                    },
                ]
            },
            {
                label: 'TopUp',
                path: '/topup',
                icon: 'bill',
                badge: '',
                userAccess: this.CanUserAccess,
                externalLink: 'TOPUP'
            },
            {
                label: 'Settings',
                path: '/dashboard/settings',
                icon: 'settings',
                badge: '',
                // userAccess: true
                userAccess: this.CanUserAccess
            },
            {
                label: 'Billing',
                path: '/dashboard/bill',
                icon: 'bill',
                badge: '',
                userAccess: this.CanUserAccess,
                comingSoon: true
            }
        ];
    }

    goToSection(link: string) {
        this.router.navigate([link]);
    }

    handleClick(item) {
        if (item.comingSoon) {
            this.handleComingSoon();
        } else if (item.externalLink === 'TOPUP') {
            this.redirectToTopupPortal(null);
        } else {
            this.goToSection(item.path);
        }
    }

    handleComingSoon() {
        this.dialog.open(ComingSoonComponent, {
            data: {},
            height: 'auto',
            width: '480px',
            panelClass: 'dialog-confirmation'
        });
    }

    redirectToTopupPortal(e) {
        if (e) {
            e.preventDefault();
        }

        let topupUrl = environment ? environment.topup_url + 'topup?token=' : 'https://topup.dev-sheba.xyz/topup?token=';

        this.jwt.getJWT().then((response: any) => {
            if (response.code === 200) {
                topupUrl += response.token;
                this.openInNewTab(topupUrl);
            }
        });
    }

    openInNewTab(url) {
        const win = window.open(url, '_blank');
        win.focus();
    }

    canAccessEmployeeSections(type) {
        return true;
        if (this.storage.user) {
            if (type === 'support' && this.storage.user.access && this.storage.user.access.support === 1) {
                return true;
            }
            if (type === 'announcement' && this.storage.user.access && this.storage.user.access.announcement === 1) {
                return true;
            }
            if (type === 'expense' && this.storage.user.access && this.storage.user.access.expense === 1) {
                return true;
            }
            return false;
        }
        // return this.CanUserAccess && this.storage.user ? this.storage.user.business_id === 110 : false;
    }
}
