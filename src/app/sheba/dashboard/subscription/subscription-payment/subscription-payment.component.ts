import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '../../../../services/subscription-service/subscription.service';
import {StorageService} from '../../../../services/storage.service';
import {SubscriptionOrderDetailsService} from '../../subscription-orders/subscription-order-details.service';

@Component({
    selector: 'app-subscription-payment',
    templateUrl: './subscription-payment.component.html',
    styleUrls: ['./subscription-payment.component.scss']
})
export class SubscriptionPaymentComponent implements OnInit {
    orderID: any;
    billClearUrl = '';
    billItems: any[] = [];

    constructor(
        private subscriptionService: SubscriptionService,
        private storage: StorageService,
        private subscriptionOrderDetailsService: SubscriptionOrderDetailsService
    ) {
        this.orderID =  subscriptionService.Order.id;
        this.billClearUrl = 'v2/businesses/' + this.storage.user.business_id + '/subscription-orders/' + this.orderID + '/bills/clear';
        this.subscriptionOrderDetailsService.getSubscriptionOrderDetails(this.orderID).toPromise().then(res => {
            this.generateBillData(res);
        });
    }

    ngOnInit() {
    }

    generateBillData(data) {
        this.billItems = [
            {
                title: data.service_name + '(' + data.total_quantity + ')',
                amount: data.original_price,
                is_bold: false,
                has_underline: true
            },
            {
                title: 'Subtotal',
                amount: data.original_price * data.total_quantity,
                is_bold: true,
                has_underline: false
            },
            {
                title: 'Discount',
                amount: data.discount,
                is_bold: false,
                has_underline: true,
                color: '#00804c'
            },
            {
                title: 'Total',
                amount: data.total_price,
                is_bold: true,
                has_underline: false
            }
        ];
    }
}
