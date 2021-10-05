import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {OrderService} from '../../../../services/order-service/order.service';

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
    public payments: any[];
    public selectedPaymentMethod: any = null;
    private paymentDetails: any = null;

    constructor(
        private http: ShebaHttpService,
        private route: ActivatedRoute,
        private storage: StorageService,
        public orderService: OrderService,
        private router: Router
    ) {
        this.setData();
    }

    ngOnInit() {
        if (!this.orderService.OrderDetails) {
            this.router.navigate(['/', 'dashboard', 'quick-purchase']).catch(err => {
                console.log(err);
            });
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    setData() {
        this.route.data.subscribe(res => {
            this.payments = res.payments as any[];
        });
    }

    selectPaymentMethod(paymentMethod) {
        this.selectedPaymentMethod = paymentMethod;


        const url = 'v2/businesses/' + this.storage.user.business_id + '/orders/' + this.orderService.OrderDetails.order_id + '/bills/clear?payment_method=' + this.selectedPaymentMethod.method_name;

        console.log(url);

        this.http.get(url).toPromise().then(res => {
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
                this.router.navigate(['/', 'dashboard', 'orders', this.orderService.OrderDetails.order_id]).catch(err => {
                    console.log(err);
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    calculateDiscount() {
        if (this.orderService.Partner.discount > 0) {
            return Math.round(this.orderService.Partner.discount);
        } else {
            return this.orderService.Voucher ? Math.round(this.orderService.Voucher.amount) : 0;
        }
    }

    getTotalPrice() {
        return this.orderService.Voucher ? Math.round(this.orderService.Partner.discounted_price - this.orderService.Voucher.amount) : Math.round(this.orderService.Partner.discounted_price);
    }
}
