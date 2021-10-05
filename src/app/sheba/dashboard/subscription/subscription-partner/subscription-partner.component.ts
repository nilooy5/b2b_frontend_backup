import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionService} from '../../../../services/subscription-service/subscription.service';

@Component({
    selector: 'app-subscription-partner',
    templateUrl: './subscription-partner.component.html',
    styleUrls: ['./subscription-partner.component.scss']
})
export class SubscriptionPartnerComponent implements OnInit {
    partners: any[] = [];

    constructor(
        private route: ActivatedRoute,
        private subscriptionService: SubscriptionService,
    ) {
        this.route.data.subscribe(res => {
            this.setData(res.partners);
        });
    }

    ngOnInit() {
        this.subscriptionService.Partner = this.subscriptionService.Partner
            ?
            this.partners.find(partner => partner.id === this.subscriptionService.Partner.id)
            :
            this.partners[0];
    }

    setData(data) {
        this.partners = data;
    }

}
