import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {OrderService} from '../../../services/order-service/order.service';
import {Subscription} from 'rxjs';
import {DashboardResolveService} from '../dashboard-resolve.service';
import {AmplitudeService} from '../../../services/amplitude.service';
import {StorageService} from '../../../services/storage.service';
import {SearchInputService} from './search-input.service';
import {SelectedMasterCategoryService} from './master-category/selected-master-category.service';
import {QuickPurchaseValidationService} from './quick-purchase-validation.service';

@Component({
    selector: 'app-quick-purchase',
    templateUrl: './quick-purchase.component.html',
    styleUrls: ['./quick-purchase.component.scss']
})

export class QuickPurchaseComponent implements OnInit, OnDestroy {
    public route: string;
    showJourneyNavigation = true;
    dataLoading = true;
    progress = 0;
    subscription: Subscription;
    open: boolean;
    @Output() searchEmitter: EventEmitter<any> = new EventEmitter();
    nextStep: string;
    private previousRoute = '';

    public searchKey = '';
    private selectedMasterCategory: string;

    currentJourneyState: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        public orderService: OrderService,
        private dashboardService: DashboardResolveService,
        private searchInput: SearchInputService,
        private storage: StorageService,
        private quickPurchaseValidationService: QuickPurchaseValidationService
    ) {
        this.dataLoading = false;
        router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.route = e.urlAfterRedirects;
                /*EXCLUDING ?category=1 this query params : dashboard/quick-purchase?category=1*/
                const url_tree = this.router.parseUrl(this.route);
                let url_without_params = url_tree.root.children['primary'].segments.map(it => it.path).join('/');
                url_without_params = '/' + url_without_params;
                if (this.route === '/dashboard/quick-purchase'
                    || this.route === '/dashboard/quick-purchase/select-service'
                    || this.route === '/dashboard/quick-purchase/checkout'
                    || this.route === '/dashboard/quick-purchase/payment'
                    || url_without_params === '/dashboard/quick-purchase') {
                    this.showJourneyNavigation = false;
                } else {
                    this.showJourneyNavigation = true;
                }
                this.getProgress(this.route);

                this.currentJourneyState = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];
                this.currentJourneyState = this.currentJourneyState.split('?')[0];
            }
        });
    }

    ngOnInit() {
        this.subscription = this.dashboardService.DashboardBehavior.asObservable().subscribe(
            res => {
                this.open = res.open;
            }
        );

        if (this.activatedRoute.snapshot.queryParams.issue_id) {
            this.orderService.Issue = this.activatedRoute.snapshot.queryParams.issue_id;
        }
    }

    getProgress(route) {
        switch (route) {
            case '/dashboard/quick-purchase/option':
                this.progress = 1;
                this.nextStep = 'Cart';
                break;
            case '/dashboard/quick-purchase/cart':
                this.progress = 1;
                this.nextStep = 'Additional Information';
                break;
            case '/dashboard/quick-purchase/additional-information':
                this.progress = 2;
                this.nextStep = 'Select Service Provider';
                break;
            case '/dashboard/quick-purchase/select-partner':
                this.progress = 3;
                this.nextStep = 'Select Schedule Time';
                break;
            case '/dashboard/quick-purchase/schedule':
                this.progress = 4;
                this.nextStep = 'Checkout';
                break;
        }
    }

    getValidation(route) {
        switch (route) {
            case '/dashboard/quick-purchase/select-service':
                return this.orderService.Services.length;
            case '/dashboard/quick-purchase/option':
                return true;
            case '/dashboard/quick-purchase/cart':
                return this.orderService.Services && this.orderService.Services.length;
            case '/dashboard/quick-purchase/additional-information':
                return this.orderService.Services && this.orderService.Services.length;
            case '/dashboard/quick-purchase/select-partner':
                return !!this.orderService.Partner;
            case '/dashboard/quick-purchase/schedule':
                return !!this.orderService.Time && this.orderService.Date;
        }
    }

    next() {
        if (this.route === '/dashboard/quick-purchase/option') {
            this.previousRoute = 'Options';
            this.quickPurchaseValidationService.notifyServiceSubmit('service-option');
        } else if (this.route === '/dashboard/quick-purchase/cart') {
            if (this.orderService.Services && this.orderService.Services.length) {
                this.router.navigate(['/', 'dashboard', 'quick-purchase', 'additional-information']).catch(err => {
                    console.log(err);
                });
            }
        } else if (this.route === '/dashboard/quick-purchase/additional-information') {
            if (this.orderService.Services && this.orderService.Services.length) {
                this.router.navigate(['/', 'dashboard', 'quick-purchase', 'select-partner']).catch(err => {
                    console.log(err);
                });
            }
        } else if (this.route === '/dashboard/quick-purchase/select-partner') {
            if (this.orderService.Partner) {
                this.router.navigate(['/', 'dashboard', 'quick-purchase', 'schedule']).catch(err => {
                    console.log(err);
                });
            }
        } else if (this.route === '/dashboard/quick-purchase/schedule') {
            if (this.orderService.Partner) {
                this.router.navigate(['/', 'dashboard', 'quick-purchase', 'checkout']).catch(err => {
                    console.log(err);
                });
            }
        }
    }

    prev() {
        if (this.route === '/dashboard/quick-purchase/select-service') {
            this.router.navigate(['/', 'dashboard', 'quick-purchase']).catch(err => {
                console.log(err);
            });
        } else if (this.route === '/dashboard/quick-purchase/option') {
            this.router.navigate(['/', 'dashboard', 'quick-purchase', 'select-service']).catch(err => {
                console.log(err);
            });
        } else if (this.route === '/dashboard/quick-purchase/cart') {
            if (this.previousRoute === 'Options') {
                this.router.navigate(['/', 'dashboard', 'quick-purchase', 'option']).catch(err => {
                    console.log(err);
                });
                this.previousRoute = '';
            } else {
                this.router.navigate(['/', 'dashboard', 'quick-purchase', 'select-service']).catch(err => {
                    console.log(err);
                });
            }
        } else if (this.route === '/dashboard/quick-purchase/additional-information') {
            this.router.navigate(['/', 'dashboard', 'quick-purchase', 'cart']).catch(err => {
                console.log(err);
            });
        } else if (this.route === '/dashboard/quick-purchase/select-partner') {
            this.router.navigate(['/', 'dashboard', 'quick-purchase', 'additional-information']).catch(err => {
                console.log(err);
            });
        } else if (this.route === '/dashboard/quick-purchase/schedule') {
            this.router.navigate(['/', 'dashboard', 'quick-purchase', 'select-partner']).catch(err => {
                console.log(err);
            });
        } else if (this.route === '/dashboard/quick-purchase/checkout') {
            this.router.navigate(['/', 'dashboard', 'schedule', 'select-partner']).catch(err => {
                console.log(err);
            });
        }
    }

    ngOnDestroy(): void {
        this.orderService.reset();
        this.subscription.unsubscribe();
    }

    search(event) {
        this.searchInput.changeSearchInput(event.target.value);
    }

    progressBar() {
        return this.progress * 25;
    }
}
