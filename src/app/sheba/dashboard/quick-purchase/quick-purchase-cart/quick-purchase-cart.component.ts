import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {OrderService} from '../../../../services/order-service/order.service';
import {SubscriptionService} from '../../../../services/subscription-service/subscription.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-quick-purchase-cart',
    templateUrl: './quick-purchase-cart.component.html',
    styleUrls: ['./quick-purchase-cart.component.scss']
})
export class QuickPurchaseCartComponent implements OnInit {

    private _services: Array<any>;
    @Input() for = 'service';
    @Input() showCounter = false;
    @Output() increaseQuantity = new EventEmitter<null>();
    @Output() decreaseQuantity = new EventEmitter<null>();
    @Output() serviceRemove = new EventEmitter<null>();


    constructor(
        private router: Router,
        public orderService: OrderService,
        private route: ActivatedRoute
    ) {
        this.setData();
    }

    @Input() set services(value: Array<any>) {
        this._services = value;
    }

    ngOnInit() {
        this.formatServicesForCart();
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnChanges(changes: SimpleChanges): void {
    }

    setData() {
        this.route.data.subscribe(res => {
            const partners = res.partners as any[];
            if (this.orderService.Partner) {
                this.orderService.Partner = partners.find(p => p.id === this.orderService.Partner.id);
            } else {
                this.orderService.Partner = partners[0];
            }
        });
    }

    formatServicesForCart() {
        this.services = this.orderService.Partner ? this.orderService.Partner.breakdown : this.orderService.Services;
    }

    get services() {
        return this._services.map(service => {
            service.options = service.option;
            return service;
        });
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    increaseServiceQuantity(index) {
        this.formatServicesForCart();
        this.updateServiceQuantity(index, 'increase');
        // this.increaseQuantity.emit(index);
    }

    decreaseServiceQuantity(index) {
        this.formatServicesForCart();
        this.updateServiceQuantity(index, 'decrease');
        // this.decreaseQuantity.emit(index);
    }

    removeService(index) {
        this.removeServiceFromCart(index);
    }

    calculatePrice() {
        let total_price = 0.00;
        if (this.orderService.Services.length) {
            this.orderService.Services.forEach(service => {
                const partner_service = this.orderService.Partner.breakdown.find(x => x.id === service.id);
                let service_unit_price = partner_service.discounted_price;
                if (partner_service.quantity > 1) {
                    service_unit_price = partner_service.discounted_price / partner_service.quantity;
                }
                const service_total_price = service_unit_price * service.quantity;
                total_price += service_total_price;
            });
        }
        return total_price;
        // return this.orderService.Services.length ? this.orderService.Partner.discounted_price : 0;
    }

    goToOptionPage() {
        this.router.navigate(['/', 'dashboard', 'quick-purchase', 'select-service']).catch(err => {
            console.log(err);
        });
    }

    removeServiceFromCart(index) {
        this.orderService.Services.splice(index, 1);
        this.orderService.Services = this.orderService.Services;
    }

    updateServiceQuantity(index, op) {
        const _services = this.orderService.Services;
        if (op === 'increase') {
            _services[index].quantity++;
            // this.orderService.Services[index].quantity++;
            // this.services[index].quantity++;
        } else {
            if (_services[index].quantity > _services[index].min_quantity) {
                _services[index].quantity--;
                // this.orderService.Services[index].quantity--;
                // this.services[index].quantity--;
            }
        }
        // this.orderService.Services = this.services;
    }
}
