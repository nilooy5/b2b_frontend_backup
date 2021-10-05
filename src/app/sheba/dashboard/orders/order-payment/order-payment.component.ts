import {Component, Input, OnInit} from '@angular/core';
import {PaymentService} from "../../quick-purchase/payment.service";
import {ShebaHttpService} from "../../../../modules/sheba-http/sheba-http.service";
import {StorageService} from "../../../../services/storage.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-order-payment',
    templateUrl: './order-payment.component.html',
    styleUrls: ['./order-payment.component.scss']
})
export class OrderPaymentComponent implements OnInit {
    payments: any[] = [];
    selectedPaymentMethod: any;
    @Input() orderID: any;
    paymentDetails;
    public completingPayment: boolean = false;

    constructor(
        private service: PaymentService,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.setData();
    }

    setData() {
        this.service.getPayments().toPromise().then(res => {
            this.payments = res;
            this.payments = this.payments.filter(item => {
                return item.is_published;
            });
        });
    }

    selectPaymentMethod(paymentMethod) {
        this.selectedPaymentMethod = paymentMethod;
        this.completingPayment = true;

        const url = 'v2/businesses/' + this.storage.user.business_id + '/orders/' + this.orderID + '/bills/clear?payment_method=' + this.selectedPaymentMethod.method_name;

        this.http.get(url).toPromise().then(res => {
            this.completingPayment = false;
            if (res.code === 200) {
                this.paymentDetails = res.payment;
                if (this.selectedPaymentMethod.method_name === 'wallet') {
                    this.walletPayment(this.paymentDetails.transaction_id);
                } else window.location.href = this.paymentDetails.link;
            }
        });
    }

    walletPayment(transaction) {
        this.http.post('v2/wallet/purchase', {transaction_id: transaction}).toPromise().then(res => {
            if (res.code === 200) this.validateWalletPayment(transaction);
        }).catch(err => {
            console.log(err);
        });
    }


    validateWalletPayment(transaction) {
        this.http.post('v2/wallet/validate', {transaction_id: transaction}).toPromise().then(res => {
            if (res.code === 200) {
                this.router.navigate(['/', 'dashboard', 'orders', this.orderID]).catch(err => {
                    console.log(err);
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

}
