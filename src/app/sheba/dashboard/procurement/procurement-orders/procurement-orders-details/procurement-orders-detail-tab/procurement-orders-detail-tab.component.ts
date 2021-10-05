import { Component, OnInit } from '@angular/core';
import { ShebaHttpService } from '../../../../../../modules/sheba-http/sheba-http.service';
import { StorageService } from '../../../../../../services/storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../../../environments/environment';


@Component({
    selector: 'app-procurement-orders-detail-tab',
    templateUrl: './procurement-orders-detail-tab.component.html',
    styleUrls: ['./procurement-orders-detail-tab.component.scss']
})

export class ProcurementOrdersDetailTabComponent implements OnInit {

    displayedColumns = ['serialNo', 'itemName', 'specifications', 'unit', 'price', 'totalPrice'];

    attachmentUploadUrl: any;
    attachments: any[] = [];
    comments: any[] = [];
    procurementId;
    procurementDetails: any;
    priceQuotationDataSource: any;
    rfqType: string;




    constructor(private http: ShebaHttpService,
                private storage: StorageService,
                private router: Router,
                private route: ActivatedRoute) {

        this.route.parent.parent.params.subscribe(res => this.procurementId = res.order_id);
        this.route.data.subscribe(res => this.procurementDetails = res.procurementOrdersDetails);

        this.attachmentUploadUrl = environment.api_url + '/v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementId + '/attachments?token=' + this.storage.user.token;
    }

    ngOnInit() {
        if (this.procurementDetails.bid_price_quotations) {
            this.setPriceQuotation(this.procurementDetails.bid_price_quotations);
        }
        this.rfqType = this.procurementDetails.procurement_type;
        this.getAttachments();
        this.getComments();
    }

    getComments() {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementId + '/comments?sort=desc')
            .toPromise()
            .then(res => {
                this.comments = res.comments || [];
            });
    }

    handleUploaded() {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    handleComment() {
        this.getComments();
    }

    limitString(str) {
        return (str && str.length > 42) ? str.slice(0, 40) + '..' : str;
    }

    setPriceQuotation(quotations) {
        this.priceQuotationDataSource = quotations.map(item => {
            return {
                itemName: item.title,
                specifications: item.short_description,
                unit: item.unit,
                price: item.unit_price,
                totalPrice: item.total_price
            };
        });
    }

    getAttachments() {
        this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementId + '/attachments')
            .toPromise()
            .then(res => {
                this.attachments = res.attach_lists || [];
            });
    }

    onClickProcurementId() {
        this.router.navigate(['/', 'dashboard', 'procurement', this.procurementDetails.procurement_id, 'details']);
    }

}
