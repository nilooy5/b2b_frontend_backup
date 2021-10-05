import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionService} from '../../../../services/subscription-service/subscription.service';

@Component({
    selector: 'app-subscription-cart',
    templateUrl: './subscription-cart.component.html',
    styleUrls: ['./subscription-cart.component.scss']
})
export class SubscriptionCartComponent implements OnInit {

    selectedServices: Array<any>;

    constructor(
        private router: Router,
        public subscriptionService: SubscriptionService,
    ) {
        this.selectedServices = this.subscriptionService.Services || [];
    }

    ngOnInit() {
        this.subscriptionService.serviceWatcher.subscribe(res => {
            if (res && res.length) {
                const services = this.selectedServices;
                services.forEach((service, index) => {
                    service.quantity = res[index].quantity;
                });
                this.selectedServices = services;
            }
        });
    }

    increaseServiceQuantity(index) {
        this.selectedServices[index].quantity++;
        this.subscriptionService.Services = this.selectedServices;
    }

    decreaseServiceQuantity(index) {
        if (this.selectedServices[index].quantity > this.selectedServices[index].min_quantity) {
            this.selectedServices[index].quantity--;
            this.subscriptionService.Services = this.selectedServices;
        }
    }

    removeService(index) {
        this.selectedServices.splice(index, 1);
        this.subscriptionService.Services = this.selectedServices;
    }

    goToOptionPage() {
        this.router.navigate(['/', 'dashboard', 'order', 'subscription', 'options']).catch(err => {
            console.log(err);
        });
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    calculatePrice() {
        return 0
    }

}
