import {Component, Input, OnInit} from '@angular/core';
import {PaymentService} from '../../sheba/dashboard/quick-purchase/payment.service';
import {ShebaHttpService} from '../sheba-http/sheba-http.service';
import {StorageService} from '../../services/storage.service';
import {Router} from '@angular/router';
import {PopAlertService} from '../pop-alert/pop-alert.service';

@Component({
    selector: 'app-sheba-payment',
    templateUrl: './sheba-payment.component.html',
    styleUrls: ['./sheba-payment.component.scss']
})

export class ShebaPaymentComponent implements OnInit {
    @Input() orderID: any;
    @Input() clearUrl: any;

    payments: any[] = [];
    selectedPaymentMethod: any;
    completingPayment = false;
    paymentDetails;

    constructor(
        private service: PaymentService,
        private http: ShebaHttpService,
        private storage: StorageService,
        private router: Router,
        private pop: PopAlertService
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
        const url = this.clearUrl + '?payment_method=' + this.selectedPaymentMethod.method_name;

        this.http.get(url).toPromise().then(res => {
            this.completingPayment = false;
            if (res.code === 200) {
                this.paymentDetails = res.payment;
                if (this.selectedPaymentMethod.method_name === 'wallet') {
                    this.walletPayment(this.paymentDetails.transaction_id);
                } else {
                    window.location.href = this.paymentDetails.link;
                }
            } else {
                this.pop.open(res.message);
            }
        });
    }

    walletPayment(transaction) {
        this.http.post('v2/wallet/purchase', {transaction_id: transaction}).toPromise().then(res => {
            if (res.code === 200) {
                this.validateWalletPayment(transaction);
            }
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
