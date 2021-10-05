import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../../../../types/orders";

@Component({
    selector: 'app-order-payment-success',
    templateUrl: './order-payment-success.component.html',
    styleUrls: ['./order-payment-success.component.scss']
})
export class OrderPaymentSuccessComponent implements OnInit {
    @Input() successMessage: string;
    @Input() order: Order;
    @Output() events: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onDetailsClick() {
        this.events.emit({details: true})
    }
}
