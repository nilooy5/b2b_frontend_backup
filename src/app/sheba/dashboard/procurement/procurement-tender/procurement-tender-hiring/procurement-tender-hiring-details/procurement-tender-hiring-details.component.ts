import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {StorageService} from '../../../../../../services/storage.service';
import {DomSanitizer} from '@angular/platform-browser';


export interface HiringRequestHistory {
    serialNo: number;
    itemName: string;
    specifications: string;
    unit: number;
    price: string;
}

const ELEMENT_DATA: HiringRequestHistory[] = [
    { serialNo: 1, itemName: 'Keyboard', specifications: 'A4Tech', unit: 10, price: '1,000'},
    { serialNo: 2, itemName: 'Mouse', specifications: 'A4Tech', unit: 20, price: '2,500'}
];

@Component({
    selector: 'app-procurement-tender-hiring-details',
    templateUrl: './procurement-tender-hiring-details.component.html',
    styleUrls: ['./procurement-tender-hiring-details.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class ProcurementTenderHiringDetailsComponent implements OnInit {

    hiringRequestDetails;
    priceQuotationDataSource;
    termsContent;
    policyContent;

    displayColumns = ['serialNo', 'itemName', 'specification', 'unit', 'price', 'total_price'];
    dataSource = ELEMENT_DATA;

    constructor(private http: ShebaHttpService,
                private router: Router,
                private route: ActivatedRoute,
                private pop: PopAlertService,
                private storage: StorageService,
                public sanitizer: DomSanitizer) {
        this.route.data.subscribe(res => {
            if (res.bidDetails.code === 200) {
                this.hiringRequestDetails = res.bidDetails.bid;
            } else {
                this.pop.open(res.bidDetails.message);
            }
        });

    }

    ngOnInit() {
        if (this.hiringRequestDetails.price_quotation) {
            this.priceQuotationDataSource = this.hiringRequestDetails.price_quotation.map(item => {
                return {
                    itemName: item.title,
                    specification: item.short_description,
                    unit: JSON.parse(item.variables).unit,
                    price: item.result
                };
            });
        }

        this.termsContent = this.hiringRequestDetails.terms;
        this.policyContent = this.hiringRequestDetails.policies;

    }

    onViewQuotation() {
        const bidId = this.route.snapshot.queryParamMap.get('id');
        const procurementId = this.route.snapshot.queryParamMap.get('procurement');
        this.router.navigate(['/', 'dashboard', 'procurement', procurementId , 'quotation'], {queryParams: {id: bidId}});
    }

    unitPrice(el) {
        return (parseFloat(el.price) / el.unit).toFixed(2);
    }
}
