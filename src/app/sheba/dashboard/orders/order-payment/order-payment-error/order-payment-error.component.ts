import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../../../../types/orders";

@Component({
    selector: 'app-order-payment-error',
    templateUrl: './order-payment-error.component.html',
    styleUrls: ['./order-payment-error.component.scss']
})
export class OrderPaymentErrorComponent implements OnInit {
    @Input() errorMessage: string;
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
