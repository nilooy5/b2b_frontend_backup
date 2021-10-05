import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from '../../../../services/subscription-service/subscription.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-subscription-details',
    templateUrl: './subscription-details.component.html',
    styleUrls: ['./subscription-details.component.scss']
})
export class SubscriptionDetailsComponent implements OnInit {

    subscription: any = null;

    constructor(
        private subscriptionService: SubscriptionService,
        public sanitizer: DomSanitizer
    ) {
        this.subscription = this.subscriptionService.Subscription;
    }

    ngOnInit() {
    }

}
