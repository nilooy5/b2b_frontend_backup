import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { OrderService } from '../../../../services/order-service/order.service';
import { SubscriptionService } from '../../../../services/subscription-service/subscription.service';
import $ from 'jquery';

@Component({
    selector: 'app-service-cart',
    templateUrl: './service-cart.component.html',
    styleUrls: ['./service-cart.component.scss']
})
export class ServiceCartComponent implements OnInit, OnChanges {

    private _services: Array<any>;
    @Input() for = 'service';
    @Input() showCounter = false;
    @Output() increaseQuantity = new EventEmitter<null>();
    @Output() decreaseQuantity = new EventEmitter<null>();
    @Output() serviceRemove = new EventEmitter<null>();

    constructor(
        public orderService: OrderService,
        public subscriptionService: SubscriptionService
    ) { }

    @Input() set services(value: Array<any>) {
        this._services = value;
    }

    ngOnInit() {
        this.formatServicesForCart();
        // this.subscriptionService.serviceWatcher.subscribe(res => {
        //     this.services = res ? res : [];
        // });
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    formatServicesForCart() {
        if (this.for === 'subscription') {
            this.services = this.subscriptionService.Services ? this.subscriptionService.Services : [];
            // this.services.map(service => {
            //     service.options = service.option;
            //     return service;
            // });
        } else {
            this.services = this.orderService.Partner ? this.orderService.Partner.breakdown : this.orderService.Services;
        }
    }

    get services() {
        return this._services.map(service => {
            service.options = service.option;
            return service;
        });
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    increaseServiceQuantity(index) {
        this.formatServicesForCart()
        this.increaseQuantity.emit(index);
    }

    decreaseServiceQuantity(index) {
        this.formatServicesForCart()
        this.decreaseQuantity.emit(index);
    }

    removeService(index) {
        this.serviceRemove.emit(index);
    }

}
