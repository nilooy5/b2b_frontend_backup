import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {environment} from '../../../../../../../environments/environment';
import {StorageService} from '../../../../../../services/storage.service';
import {ActivatedRoute} from '@angular/router';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {FormControl} from '@angular/forms';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {RfqOrderBillService} from '../../../rfq-services/rfq-order-services/rfq-order-bill.service';
import {RfqOrderBillPaymentsService} from '../../../rfq-services/rfq-order-services/rfq-order-bill-payments.service';

@Component({
    selector: 'app-rfq-orders-bill-payments',
    templateUrl: './rfq-orders-bill-payments.component.html',
    styleUrls: ['./rfq-orders-bill-payments.component.scss']
})
export class RfqOrdersBillPaymentsComponent implements OnInit {
    @ViewChild('closeModal') closeModal: ElementRef;
    @Input() billPayments;
    @Input() bidId;
    @Input() rfqId;
    @Output() billOrder = new EventEmitter<any>();
    dataSource: MatTableDataSource<any>;
    displayedColumns = ['id', 'date', 'amount', 'status', 'download', 'actions'];
    paymentRequestDetails;
    isNotesValid = false;
    paymentRequestNote = new FormControl();

    constructor(private paymentSummaryService: RfqOrderBillService,
                private billService: RfqOrderBillPaymentsService,
                private storage: StorageService,
                private route: ActivatedRoute,
                private http: ShebaHttpService,
                private pop: PopAlertService) {
    }

    ngOnInit() {
        if (this.billPayments) {
            this.dataSource = new MatTableDataSource(this.billPayments);
        } else {
            const set_data = [];
            this.dataSource = new MatTableDataSource(set_data);
        }
    }

    onClickPaymentRequest(paymentRequestId) {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.rfqId + '/bids/' + this.bidId + '/payment-requests/' + paymentRequestId).toPromise().then(response => {
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
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.rfqId + '/bids/' + this.bidId + '/payment-requests/' + this.paymentRequestDetails.id, data)
            .toPromise().then(res => {
            if (res.code === 200) {
                this.billService.getAdvancePaymentRequestsList(this.rfqId, this.bidId)
                    .subscribe(response => this.dataSource = response);
                this.paymentSummaryService.getAdvancePaymentRequestsList(this.rfqId)
                    .subscribe(response => this.billOrder.emit(response));
                this.closeModal.nativeElement.click();
            } else {
                this.pop.open('Failed');
            }
        });
    }

    downloadInvoice(paymentRequestId) {
        return environment.api_url + 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.rfqId +
            '/bids/' + this.bidId + '/payment-requests/' + paymentRequestId + '/download?token=' + this.storage.user.token;
    }
}
