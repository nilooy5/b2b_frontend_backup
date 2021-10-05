import {Component, Input, OnInit} from '@angular/core';
import { NumericFormat } from '../../../../../helpers/numeric_format.service';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';

@Component({
  selector: 'app-subscription-bill-tab',
  templateUrl: './subscription-bill-tab.component.html',
  styleUrls: ['./subscription-bill-tab.component.scss']
})
export class SubscriptionBillTabComponent implements OnInit {
    billClearUrl: string;
    showPaymentOptions = false;
    loader = false;
    orderId: any;

    @Input() paymentInfoResponse: any;
    paymentInfo: any;

    constructor(
        public numericFormat: NumericFormat,
        private http: ShebaHttpService,
        private route: ActivatedRoute,
        private storage: StorageService,
    ) { }

    ngOnInit() {
        this.orderId = this.route.snapshot.params.subscription_order_id;
        this.billClearUrl = 'v2/businesses/' + this.storage.user.business_id + '/subscription-orders/' + this.orderId + '/bills/clear';
        this.paymentInfo = this.paymentInfoResponse;
    }
    downloadInvoice() {
        this.loader = true;
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/subscription-orders/' + this.orderId + '/invoice?token=' + this.storage.user.token)
            .toPromise()
            .then(res => {
                this.loader = false;
                window.open(res.link, '_blank');
            });

    }
}
