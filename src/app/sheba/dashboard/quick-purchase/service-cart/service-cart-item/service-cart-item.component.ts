import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { OrderService } from '../../../../../services/order-service/order.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SubscriptionService } from '../../../../../services/subscription-service/subscription.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-service-cart-item',
    templateUrl: './service-cart-item.component.html',
    styleUrls: ['./service-cart-item.component.scss']
})

export class ServiceCartItemComponent implements OnInit {

    @Input() service: any;
    @Input() for: any = 'service';
    @Input() index: number;
    @Input() showCounter: any;
    @Output() increaseQuantity = new EventEmitter<null>();
    @Output() decreaseQuantity = new EventEmitter<null>();
    @Output() serviceRemove = new EventEmitter<null>();
    serviceQuantity: any;

    route: any;
    private fromService = false;

    constructor(
        public orderService: OrderService,
        public subscriptionService: SubscriptionService,
        private router: Router,
        private pop: PopAlertService,
        private activeRoute: ActivatedRoute
    ) {
        this.fromService = this.activeRoute.snapshot.routeConfig.path === 'select-service';
        router.events.subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.route = e.urlAfterRedirects;
                this.fromService = this.route === '/dashboard/quick-purchase/select-service';
            }
        });
    }

    ngOnInit() {
        this.serviceQuantity = this.service.quantity;
    }

    increaseServiceQuantity(index?) {
        if (this.for === 'service') { // this.for === 'service' && this.showCounter
            // const serviceIndex = this.orderService.Services.findIndex(s => s.id == this.service.id);
            // this.orderService.Services[index].quantity++;
            const service = this.orderService.Services;
            service[index].quantity++;
            this.orderService.Services = service;
            this.serviceQuantity++;
        }
        if (this.for === 'subscription') {
            let _services = this.subscriptionService.Services;
            _services[index].quantity++;
            this.subscriptionService.Services = _services;
        }
        // this.increaseQuantity.emit();
    }

    decreaseServiceQuantity(index?) {
        if (this.for === 'service') { // this.for === 'service' && this.showCounter
            // const serviceIndex = this.orderService.Services.findIndex(s => s.id == this.service.id);
            // if (this.orderService.Services[serviceIndex].quantity > this.orderService.Services[serviceIndex].min_quantity) {
            //     this.orderService.Services[serviceIndex].quantity--;
            //     this.orderService[serviceIndex].quantity--;
            // }
            const service = this.orderService.Services;
            if (service[index].quantity > service[index].min_quantity) {
                service[index].quantity--;
                this.serviceQuantity--;
            }
            this.orderService.Services = service;
            // if (this.orderService.Services[index].quantity > this.orderService.Services[index].min_quantity) { this.orderService.Services[index].quantity--; }
        }
        if (this.for === 'subscription') {
            let _services = this.subscriptionService.Services
            if (_services[index].quantity > 1) { _services[index].quantity--; }
            this.subscriptionService.Services = _services;
            // console.log(this.subscriptionService.Services);
            // if (this.subscriptionService.Services[index].quantity > this.subscriptionService.Services[index].min_quantity) { this.subscriptionService.Services[index].quantity--; }
        }
        // this.decreaseQuantity.emit();
    }

    removeService() {
        this.serviceRemove.emit();
    }

    removeSubscriptionService(i) {
        // this.subscriptionService.Services.splice(i, 1);
        this.serviceRemove.emit();
    }


    onChangeQuantity(index, event) {

        if (this.for === 'service') {

            if (event.target.value && event.target.value < this.service.min_quantity) {
                this.serviceQuantity = this.service.min_quantity.toString();
                const _service = this.orderService.Services;
                _service[index].quantity = this.service.min_quantity;
                this.orderService.Services = _service;
                this.pop.open('Can not be less than minimum quantity');
                return;
            }

            const service = this.orderService.Services;
            service[index].quantity = event.target.value;
            this.orderService.Services = service;
        }
        if (this.for === 'subscription') {

            if (event.target.value && event.target.value < this.service.min_quantity) {
                this.serviceQuantity = this.service.min_quantity.toString();
                const _subscription = this.subscriptionService.Services;
                _subscription[index].quantity = this.service.min_quantity;
                this.subscriptionService.Services = _subscription;
                this.pop.open('Can not be less than minimum quantity');
                return;
            }

            let _services = this.subscriptionService.Services;
            _services[index].quantity = event.target.value;
            this.subscriptionService.Services = _services;
        }

    }

    onBlur(event) {
        if (event.target.value === '') {
            this.serviceQuantity = this.service.min_quantity.toString();
            this.pop.open('Quantity can not be empty');
        }
    }
}
