import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../../../services/storage.service';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-subscription-order-details',
    templateUrl: './subscription-order-details.component.html',
    styleUrls: ['./subscription-order-details.component.scss']
})
export class SubscriptionOrderDetailsComponent implements OnInit {

    public ordersList: any;
    public orderDetails: any;
    public orderInfo: any;
    invoiceId: string;
    orderId: any;

    constructor(
        private route: ActivatedRoute,
        private storage: StorageService,
        private http: ShebaHttpService,
        private pop: PopAlertService
    ) {
        this.route.data.subscribe(res => {
            this.ordersList = res.orderDetails.orders.map(order => {
                return {
                    service_name: res.orderDetails.service_name,
                    id: order.id,
                    date: order.schedule_date.date,
                    time: order.preferred_time,
                    price: res.orderDetails.original_price,
                    partner_order_id: order.partner_order_id,
                    status: order.job_status,

                };
            },
            this.orderInfo = res.orderDetails,
            this.orderDetails = res.orderDetails
        );
        });
        this.invoiceId = this.route.snapshot.queryParams.invoice_id;
        this.orderId = this.route.snapshot.params.subscription_order_id;
    }


    ngOnInit() {
        this.updateTransaction();
    }
    removeParam() {
        setTimeout(() => {
            location.href = location.href.split('?')[0];
        }, 500);
    }

    updateTransaction() {
        if (this.invoiceId) {
            this.http.post('v2/transactions/' + this.invoiceId, {invoice_id: this.invoiceId}).toPromise().then(res => {
                if (res.code === 200) {
                    this.pop.open('Payment Successful.');
                } else {
                    this.pop.open(res.message);
                }
                this.removeParam();
            }).catch(err => {
                this.pop.open('Payment failed.');
                this.removeParam();
            });
        }
    }

}
