import {Component, OnInit} from '@angular/core';
import {Order} from "../../../../types/orders";
import {ActivatedRoute} from "@angular/router";
import {appConfig} from "../../../../config/app.config";
import {OrderService} from "../../../../services/order-service/order.service";

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
    order: Order;
    appConfig = appConfig;
    showPaymentMethod: boolean = false;
    showPaymentSuccess: boolean = false;
    showPaymentError: boolean = false;
    invoiceId: string;
    updating: boolean = true;
    paymentSuccessMessage: string;
    paymentErrorMessage: string;

    constructor(
        private route: ActivatedRoute,
        private service: OrderService
    ) {
        this.route.data.subscribe(res => {
            this.order = res.order;
        });
        this.invoiceId = this.route.snapshot.queryParams.invoice_id;
    }

    ngOnInit() {
        this.updateTransaction();
    }

    updateTransaction() {
        if (this.invoiceId) {
            this.service.verifyPayment(this.invoiceId).toPromise().then(res => {
                if (res.code === 200) {
                    this.showPaymentSuccess = true;
                    this.paymentSuccessMessage = 'Your payment has been successful';
                    this.service.getOrder(this.order.id).toPromise().then(response => {
                        if (response.code === 200) {
                            this.order = response.order;
                        } else {
                            this.updating = false;
                        }
                    });
                } else {
                    this.showPaymentError = true;
                    this.updating = false;
                    this.paymentErrorMessage = res.message;
                }
            }).catch(err => {
                this.updating = false;
            });
        } else {
            this.updating = false;
        }
    }

    showOrderDetails() {
        this.showPaymentSuccess = false;
        this.showPaymentError = false;
    }

    billActionClick(type: string) {
        if (type === 'payment') {
            this.showPaymentMethod = true;
        } else if (type === 'invoice') {

        }
    }

}
