import {Component, OnInit} from '@angular/core';
import {SubscriptionService} from '../../../../services/subscription-service/subscription.service';

@Component({
    selector: 'app-subscription-additional',
    templateUrl: './subscription-additional.component.html',
    styleUrls: ['./subscription-additional.component.scss']
})
export class SubscriptionAdditionalComponent implements OnInit {
    additionalInfo: '';
    selectedServices: Array<any>;

    constructor(
        private subscriptionService: SubscriptionService,
    ) {
        this.selectedServices = subscriptionService.Services;
    }

    ngOnInit() {
    }

    updateAdditionalInfo(e) {
        console.log(e.target.value);
        this.subscriptionService.Additional = e.target.value;
    }

}
