import {Component, OnInit, Input, Output, EventEmitter, HostBinding} from '@angular/core';
import {OrderService} from '../../../services/order-service/order.service';

@Component({
    selector: 'app-journey-header',
    templateUrl: './journey-header.component.html',
    styleUrls: ['./journey-header.component.scss']
})
export class JourneyHeaderComponent implements OnInit {

    @Input() title: string;
    @Input() showCart: boolean;
    @Input() padding: string;
    @Input() counter: number;
    @Output() cart: EventEmitter<any> = new EventEmitter();
    @Output() close: EventEmitter<any> = new EventEmitter();

    constructor(
        private orderService: OrderService
    ) {
    }

    ngOnInit() {

    }

    getCounter() {
        return this.counter ? this.counter : (this.orderService.Services ? this.orderService.Services.length : 0);
    }

    openCart() {
        this.cart.emit(null);
    }

}
