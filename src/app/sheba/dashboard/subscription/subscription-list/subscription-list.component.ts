import {Component, ElementRef, EventEmitter, Inject, OnInit, Output, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionService} from '../../../../services/subscription-service/subscription.service';
import {HomeShowcase} from '../../../../types/general';
import {WINDOW} from '@ng-toolkit/universal';
import {SubscriptionServiceCategoryListService} from '../subscription-service-category-list.service';
import {Category} from '../../../../models/category';

@Component({
    selector: 'app-subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {
    public subscriptions: any[] = [];
    public filteredSubscriptions: any[] = [];
    public subscriptions_categories: any[] = [];
    public subscriptionProcedure: any = {
        title: 'How Subscription Works?', data: [
            {
                title: '1. Choose Service',
                text: 'Choose your desired service anytime from anywhere.',
                image: 'https://cdn-shebaxyz.s3.ap-south-1.amazonaws.com/b2b/image/icon/choose_service.png'
            },
            {
                title: '2. Configure your service',
                text: 'Select the quantity and schedule that will work for you.',
                image: 'https://cdn-shebaxyz.s3.ap-south-1.amazonaws.com/b2b/image/icon/select_dates.png'
            },
            {
                title: '3. Receive repeated service',
                text: 'Create subscription, stay relax. We will take care of the rest.',
                image: 'https://cdn-shebaxyz.s3.ap-south-1.amazonaws.com/b2b/image/icon/get_service.png'
            }
        ]
    };
    totalSubscription: number;
    constructor(
        private route: ActivatedRoute,
        private subscriptionService: SubscriptionService,
        private subscriptionServiceCategoryListService: SubscriptionServiceCategoryListService,
        private router: Router,
        @Inject(WINDOW) public window: Window
    ) {
        this.route.data.subscribe(res => {
            this.setData(res);
        });
    }

    ngOnInit() {
        this.subscriptionService.clearStorage();
    }

    setData(data) {
        // console.log(data.subscriptions);
        this.subscriptions = data.subscriptions;
        this.totalSubscription = this.subscriptions ? this.subscriptions.length : 0;
        this.filteredSubscriptions = data.subscriptions ? [].concat(data.subscriptions) : [];
        this.subscriptions_categories = data.categories;
    }

    selectSubscription(item) {
        if (this.subscriptionService.Subscription.subscription_id !== item.subscription_id) {
            // this.subscriptionService.clearStorage();
            this.subscriptionService.Subscription = item;
        }
        this.goToSubscriptionDetails();
    }

    goToSubscriptionDetails() {
        this.router.navigate(['/', 'dashboard', 'order', 'subscription', 'details']).catch(err => {
            console.log(err);
        });
    }

    moveTo(templateRef: HTMLElement) {
        this.window.scrollTo({
            left: 0,
            top: templateRef.offsetTop,
            behavior: 'smooth'
        });
    }

    handleFilter(category) {
        category = parseInt(category, 10);
        this.filteredSubscriptions = category === 0 ? this.subscriptions : this.subscriptions.filter(element => {
            return element.category_id === category;
        });
    }

    handleSearch(key) {
        this.filteredSubscriptions = this.subscriptions.filter(item => item.subscription_name.toLowerCase().includes(key.toLowerCase()));
    }

    handleNameSort(key) {
        key = parseInt(key, 10);
        if (key === 0) {
            this.filteredSubscriptions = this.subscriptions;
        } else {
            this.filteredSubscriptions = this.filteredSubscriptions.sort((a, b) => {
                if (key === 1) {
                    return a.subscription_name.toLowerCase() < b.subscription_name.toLowerCase() ? -1 : 1;
                } else if (key === 2) {
                    return a.subscription_name.toLowerCase() > b.subscription_name.toLowerCase() ? -1 : 1;
                }
            });
        }

    }
}
