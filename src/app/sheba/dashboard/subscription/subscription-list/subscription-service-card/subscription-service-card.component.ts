import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {appConfig} from '../../../../../config/app.config';
import {SubscriptionService} from '../../../../../services/subscription-service/subscription.service';

@Component({
    selector: 'app-subscription-service-card',
    templateUrl: './subscription-service-card.component.html',
    styleUrls: ['./subscription-service-card.component.scss']
})
export class SubscriptionServiceCardComponent implements OnInit {

    @Input() subscription: any = null;
    appConfig = appConfig;

    constructor(
        private subscriptionService: SubscriptionService,
        private router: Router
    ) {
    }

    ngOnInit() {
        // console.log(this.subscription);
    }

    selectSubscription() {
        this.subscriptionService.Subscription = this.subscription;
        this.goToSubscriptionDetails();
    }

    goToSubscriptionDetails() {
        this.router.navigate(['/', 'dashboard', 'order', 'subscription', 'details']).catch(err => {
            console.log(err);
        });
    }
}
