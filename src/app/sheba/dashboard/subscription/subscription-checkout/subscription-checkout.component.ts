import { Component, OnInit } from '@angular/core';
import {MONTHS, WeekDays} from '../../../../helpers/constants';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';
import {SubscriptionService} from '../../../../services/subscription-service/subscription.service';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-subscription-checkout',
    templateUrl: './subscription-checkout.component.html',
    styleUrls: ['./subscription-checkout.component.scss']
})
export class SubscriptionCheckoutComponent implements OnInit {
    services: any[] = [];
    partner: any;
    dates: any = [];
    time: any;
    monthNames: string[] = MONTHS;
    weekdays: string[] = WeekDays;
    additionalInfo: any;
    placingOrder = false;
    openedCollapse = -1;

    constructor(
        private pop: PopAlertService,
        private subscriptionService: SubscriptionService,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router
    ) {
        if (!this.subscriptionService.Subscription) {
            this.router.navigate(['/', 'dashboard', 'order', 'subscription']);
        }
    }

    ngOnInit() {
        this.partner = this.subscriptionService.Partner || {};
        this.services = this.subscriptionService.Services || [];
        this.dates = this.subscriptionService.Dates || [];
        this.time = this.subscriptionService.Time || null;
        this.additionalInfo = this.subscriptionService.Additional || '';
    }

    getMonthDateWithMonth(date) {
        const d = new Date(date);

        const month = this.monthNames[d.getMonth()];

        return d.getDate() + ' ' + month + ', ' + this.weekdays[d.getDay()];
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    calculateDiscount() {
        // if (this.orderService.Partner.discount > 0) {
        //     return Math.round(this.orderService.Partner.discount);
        // } else {
        //     return this.orderService.Voucher ? Math.round(this.orderService.Voucher.amount) : 0;
        // }
        return 0;
    }

    getTotalPrice() {
        return this.subscriptionService.Partner.discounted_price * this.subscriptionService.Dates.length;
    }

    constructOrderObject() {
        const services = this.services.map(service => {
            return {
                id: service.id,
                quantity : service.quantity,
                option: Array.isArray(service.option) ? service.option : [service.option]
            };
        });
        return  {
            subscription_type: 'monthly',
            partner: this.partner.id,
            services: JSON.stringify(services),
            time: this.time,
            date: JSON.stringify(this.dates),
            additional_info: this.additionalInfo,
        };
    }

    redirectToPaymentPage() {
        this.router.navigate(['/', 'dashboard', 'order', 'subscription', 'payment']).catch(err => {
            console.log(err);
        });
    }

    placeOrder() {
        this.placingOrder = true;
        const submitData = this.constructOrderObject();
        this.http.postWithFiles('v2/businesses/'
            + this.storage.user.business_id
            + '/subscription-orders', submitData).toPromise().then(({code, order}) => {
            if (code === 200) {
                this.subscriptionService.Order = order;
                this.subscriptionService.Subscription = null;
                this.redirectToPaymentPage();
            } else {
                this.pop.open('Something went wrong on placing order.');
            }
            this.placingOrder = false;
        });
    }

}
