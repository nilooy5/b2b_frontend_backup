import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DashboardResolveService } from '../dashboard-resolve.service';
import { SubscriptionService } from '../../../services/subscription-service/subscription.service';
import { PopAlertService } from '../../../modules/pop-alert/pop-alert.service';
import {SubscriptionValidationService} from './subscription-validation.service';

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
    showJourneyNavigation = true;
    progress = 0;
    open: boolean;
    subscription: any;
    journeyState: string;
    nextStep: string;

    constructor(
        private router: Router,
        private dashboardService: DashboardResolveService,
        private subscriptionService: SubscriptionService,
        private subscriptionValidationService: SubscriptionValidationService,
        private pop: PopAlertService
    ) {
        this.router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.journeyState = e.urlAfterRedirects.split('/')[e.urlAfterRedirects.split('/').length - 1];

                this.handleJourneyStateChange(this.journeyState);
            }
        });
    }

    ngOnInit() {
        this.subscription = this.dashboardService.DashboardBehavior.asObservable().subscribe(
            res => {
                this.open = res.open;
            }
        );
    }

    next() {
        switch (this.journeyState) {
            case 'details':
                this.nextNavigate(this.journeyState, 'options');
                break;
            case 'options':
                this.subscriptionValidationService.notifySubsSubmit('submit');
                // this.nextNavigate(this.journeyState, 'cart');
                break;
            case 'cart':
                this.nextNavigate(this.journeyState, 'additional');
                break;
            case 'additional':
                this.nextNavigate(this.journeyState, 'schedule');
                break;
            case 'schedule':
                this.nextNavigate(this.journeyState, 'time');
                break;
            case 'time':
                this.nextNavigate(this.journeyState, 'partner');
                break;
            case 'partner':
                this.nextNavigate(this.journeyState, 'checkout');
                break;
        }
    }

    nextNavigate(curentstate, nextState) {
        if (this.getValidation(curentstate)) {
            this.router.navigate(['/', 'dashboard', 'order', 'subscription', nextState]).catch(err => {
                console.log(err);
            });
        } else {
            this.pop.open('There was something wrong');
        }
    }

    prev() {
        switch (this.journeyState) {
            case 'details':
                this.subscriptionService.clearStorage();
                this.prevNavigate('subscription');
                break;
            case 'options':
                this.prevNavigate('details');
                break;
            case 'cart':
                this.prevNavigate('options');
                break;
            case 'additional':
                this.prevNavigate('cart');
                break;
            case 'schedule':
                this.prevNavigate('additional');
                break;
            case 'time':
                this.prevNavigate('schedule');
                break;
            case 'partner':
                this.prevNavigate('time');
                break;
        }
    }

    prevNavigate(prevState) {
        if (prevState === 'subscription') {
            this.router.navigate(['/', 'dashboard', 'order', 'subscription']).catch(err => {
                console.log(err);
            });
        } else {
            this.router.navigate(['/', 'dashboard', 'order', 'subscription', prevState]).catch(err => {
                console.log(err);
            });
        }
    }

    handleJourneyStateChange(state) {
        this.showJourneyNavigation = state !== 'subscription' && state !== 'checkout' && state !== 'payment';

        switch (state) {
            case 'subscription':
                this.progress = 0;
                this.nextStep = 'details';
                break;
            case 'details':
                this.progress = 1;
                this.nextStep = 'Add Service';
                break;
            case 'options':
                this.progress = 2;
                this.nextStep = 'Cart';
                break;
            case 'cart':
                this.progress = 3;
                this.nextStep = 'Additional Information';
                break;
            case 'additional':
                this.progress = 4;
                this.nextStep = 'Select Schedule ';
                break;
            case 'schedule':
                this.progress = 5;
                this.nextStep = 'Select Time';
                break;
            case 'time':
                this.progress = 6;
                this.nextStep = 'Select Service Provider';
                break;
            case 'partner':
                this.progress = 7;
                this.nextStep = 'Checkout';
                break;
        }
    }

    getValidation(state) {
        switch (state) {
            case 'subscription':
                return this.subscriptionService.Subscription;
            case 'details':
                return true;
            case 'options':
                return true;
                // return this.subscriptionService.Services.length > 0;
            case 'cart':
                // return true;
                return this.subscriptionService.Services && this.subscriptionService.Services.length;
            case 'additional':
                return true;
            case 'schedule':
                // tslint:disable-next-line:max-line-length
                return this.subscriptionService.Dates ?  this.subscriptionService.Dates.length >= (this.subscriptionService.Subscription.min_monthly_qty ? this.subscriptionService.Subscription.min_monthly_qty :  1) : false;
            case 'time':
                return this.subscriptionService.Time;
            case 'partner':
                return this.subscriptionService.Partner;
        }
    }

}
