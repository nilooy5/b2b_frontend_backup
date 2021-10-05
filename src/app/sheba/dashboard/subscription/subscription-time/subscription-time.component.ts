import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '../../../../services/subscription-service/subscription.service';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionPartnerListService} from '../subscription-partner-list.service';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-subscription-time',
    templateUrl: './subscription-time.component.html',
    styleUrls: ['./subscription-time.component.scss']
})
export class SubscriptionTimeComponent implements OnInit {
    subscriptionName: string;
    times: any[] = [];
    selectedTime: any[] = [];

    constructor(
        private subscriptionService: SubscriptionService,
        private route: ActivatedRoute,
        private subscriptionPartnerListService: SubscriptionPartnerListService,
        private pop: PopAlertService,
    ) {
        this.subscriptionName = subscriptionService.Subscription.subscription_name;
        this.route.data.subscribe(res => {
            this.times = Object.keys(res.times.times).map(time => {
                return {
                    time: res.times.times[time],
                    loading: true,
                    valid: true
                };
            });
        });
    }

    ngOnInit() {
        this.verifyTime();
    }

    verifyTime() {
        this.times.forEach(time => {
            time.loading = true;
            this.subscriptionPartnerListService.getPartners(time.time).toPromise().then(res => {
                time.valid = (!!res && res !== undefined) ? (res && !!res.length) : false;
                time.loading = false;
            }).catch(err => {
                time.valid = false;
                time.loading = false;
            });
        });
    }

    selectTime(time) {
        this.selectedTime = time;
        this.subscriptionService.Time = time;
    }

    getTimeString(time) {
        const start = time.time.split('-')[0];
        return [start.split(' ')[0], start.split(' ')[1]];
    }

    getValidTimes() {
        return this.times.filter(t => t.valid);
    }
}
