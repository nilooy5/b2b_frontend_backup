import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {environment} from '../../../../../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-procurement-tender-detail-quotation',
    templateUrl: './procurement-tender-detail-quotation.component.html',
    styleUrls: ['./procurement-tender-detail-quotation.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})

export class ProcurementTenderDetailQuotationComponent implements OnInit {

    env;
    procurementId: any;
    bidId: any;
    bidDetails: any;
    vendorInformation: any;
    technicalEvaluationQuestions: any;
    companyEvaluationQuestions: any;
    displayColumns = ['serialNo', 'itemName', 'specification', 'unit', 'price', 'total_price'];
    priceQuotationDataSource;


    constructor(private http: ShebaHttpService,
                private router: Router,
                private route: ActivatedRoute,
                private storage: StorageService,
                public sanitizer: DomSanitizer,
                private pop: PopAlertService) {

        this.env = environment;
        this.route.data.subscribe(res => {
            if (res.bidDetails.code === 200) {
                this.bidDetails = res.bidDetails.bid;
                console.log(this.bidDetails);
                this.vendorInformation = res.bidDetails.bid.vendor;
            } else {
                this.pop.open(res.bidDetails.message);
            }
        });

    }

    ngOnInit() {
        if (this.bidDetails.price_quotation) {
            this.priceQuotationDataSource = this.bidDetails.price_quotation.map(item => {
                return {
                    itemName: item.title,
                    specification: item.short_description,
                    unit: JSON.parse(item.variables).unit,
                    price: item.result
                };
            });

        }

        if (this.bidDetails.technical_evaluation) {
            this.technicalEvaluationQuestions = this.bidDetails.technical_evaluation.map(item => {
                return {
                    title: item.title,
                    answer: this.formatAnswer(item),
                    input_type: item.input_type,
                    options: JSON.parse(item.variables).options
                };
            });
        }

        if (this.bidDetails.company_evaluation) {
            this.companyEvaluationQuestions = this.bidDetails.company_evaluation.map(item => {
                return {
                    title: item.title,
                    answer: this.formatAnswer(item),
                    input_type: item.input_type,
                    options: JSON.parse(item.variables).options
                };
            });

        }
    }

    formatAnswer(item) {
        if (item.input_type === 'checkbox') {
            return item.result
                .replace(/[\[\]']+/g, '')
                .replace(/[\]\["]/g, '')
                .replace(/[,\/]/, ', ');
        } else {
            return item.result;
        }
    }

    onClickHire() {
        this.route.parent.parent.params.subscribe(value => this.procurementId = value.procurement_id);
        this.bidId = this.bidDetails.id;
        this.router.navigate(['/', 'dashboard', 'procurement', 'hiring', 'request'], {queryParams: {id: this.bidId, procurement: this.procurementId}});
    }

    limitString(str) {
        return (str && str.length > 30) ? str.slice(0, 25) + '..' : str;
    }

    getUnitPrice(el) {
        return  (parseFloat(el.price) / el.unit).toFixed(2);
    }

}
