import { Component, OnInit } from '@angular/core';
import { ProcurementOrdersBillService } from '../procurement-orders-bill.service';
import { ActivatedRoute } from '@angular/router';
import { ViewChild, ElementRef } from '@angular/core';
import { ShebaHttpService } from '../../../../../../modules/sheba-http/sheba-http.service';
import { StorageService } from '../../../../../../services/storage.service';
import { FormControl } from '@angular/forms';
import { ProcurementOrdersPaymentSummaryService } from '../procurement-orders-payment-summary.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
    selector: 'app-procurement-orders-bill-tab',
    templateUrl: './procurement-orders-bill-tab.component.html',
    styleUrls: ['./procurement-orders-bill-tab.component.scss']
})

export class ProcurementOrdersBillTabComponent implements OnInit {

    @ViewChild('closeModal') closeModal: ElementRef;
    displayedColumns = ['id', 'date', 'amount', 'status', 'download', 'actions'];

    bidId;
    showPaymentOptions = false;
    billClearUrl: string;
    isNotesValid = false;
    procurementId;
    paymentRequestDetails;
    paymentRequestsDataSource;
    paymentSummary;
    paymentRequestNote = new FormControl();

    constructor(private billService: ProcurementOrdersBillService,
                private paymentSummaryService: ProcurementOrdersPaymentSummaryService,
                private http: ShebaHttpService,
                private storage: StorageService,
                private route: ActivatedRoute) {
        this.route.parent.parent.params.subscribe(res => this.procurementId = res.order_id);
        this.route.queryParams.subscribe(res => this.bidId = res.bid);

        this.route.data.subscribe(res => {
            this.paymentRequestsDataSource = res.paymentRequests;
            this.paymentSummary = res.paymentSummary;
        });

    }

    ngOnInit() {
        this.billClearUrl = 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementId + '/bills/clear';
    }

    onClickPayBill() {
        this.showPaymentOptions = true;
    }

    onClickPaymentRequest(paymentRequestId) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementId + '/bids/' + this.bidId + '/payment-requests/' + paymentRequestId).toPromise().then(response => {
            if (response.code === 200) {
                this.paymentRequestDetails = response.payment_request_details;
            } else {
                console.error(response);
            }
        }).catch(error => {
            console.error(error.message);
        });
    }

    onSubmitPaymentRequest(res) {

        if (res === 'reject') {
            if (this.paymentRequestNote.value !== null) {
                this.isNotesValid = false;
                const requestInfo = {
                    note: this.paymentRequestNote.value,
                    status: 'rejected'
                };
                this.postToApi(requestInfo);
            } else {
                this.isNotesValid = true;
            }
        }

        if (res === 'accept') {
            const requestInfo = {
                note: this.paymentRequestNote.value,
                status: 'approved'
            };
            this.isNotesValid = false;
            this.postToApi(requestInfo);
        }

    }

    postToApi(data) {
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementId + '/bids/' + this.bidId + '/payment-requests/' + this.paymentRequestDetails.id, data)
            .toPromise().then(res => {
                if (res.code === 200) {
                    this.billService.getAdvancePaymentRequestsList(this.procurementId, this.bidId)
                        .subscribe(response => this.paymentRequestsDataSource = response);
                    this.paymentSummaryService.getPaymentSummary(this.procurementId)
                        .subscribe(response => this.paymentSummary = response);
                    this.closeModal.nativeElement.click();
                    console.log('Successful');
                } else {
                    console.log('Failed');
                }
        });
    }

    downloadInvoice(paymentRequestId) {
        return environment.api_url + 'v2/businesses/'  + this.storage.user.business_id + '/procurements/' + this.procurementId +
            '/bids/' + this.bidId + '/payment-requests/' + paymentRequestId + '/download?token=' + this.storage.user.token;
    }
}
