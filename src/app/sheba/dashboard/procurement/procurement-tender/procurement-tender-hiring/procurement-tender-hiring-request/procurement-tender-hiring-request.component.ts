import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {TableDataSource, ValidatorService} from 'angular4-material-table';
import {QuotationValidatorService} from './quotation-validator.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {StorageService} from '../../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {main} from '@angular/compiler-cli/src/main';


export class Quotation {
    serialNo: number;
    id: number;
    itemName: string;
    specification: string;
    unit: number;
    price: number;
}

@Component({
    selector: 'app-procurement-tender-hiring-request',
    templateUrl: './procurement-tender-hiring-request.component.html',
    styleUrls: ['./procurement-tender-hiring-request.component.scss'],
    providers: [
        {provide: ValidatorService, useClass: QuotationValidatorService }
    ],
    encapsulation: ViewEncapsulation.Emulated
})

export class ProcurementTenderHiringRequestComponent implements OnInit {

    displayColumns = ['serialNo', 'itemName', 'specification', 'unit', 'price', 'total_price', 'actionsColumn'];

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '15rem',
        minHeight: '5rem',
        sanitize: false,
        placeholder: 'Enter text here...',
        translate: 'no',
        defaultFontName: 'Arial',
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ]
    };

    bidInformation: any;
    proposedPrice = new FormControl('', Validators.required);
    submittedData;
    receivedData;
    subtotalPrice;

    enableTermsAndConditionEditButton = true;
    enablePolicyEditButton = true;
    isTermsAndConditionEditable = false;
    isPolicyEditable = false;

    dataSource: TableDataSource<Quotation>;

    termsAndConditionContent = new FormControl('<p>After clicking on ‘Hire\' button admin will be redirected to this page.\n' +
        'In this page, admin can check the procurement title,\n' + 'vendor name, total price.\n' + 'Admin can also see a table where there will be Sl no.\n' +
        '</p>\n' + '<ol>\n' + '<li>In economics, a service is a transaction in which</li>\n' + '<li>The benefits of such a service are held to be demonstrated</li>\n' +
        '<li>Buyer\'s willingness to make the exchange</li>\n' + '</ol>');

    policyContent = new FormControl('<p>After clicking on ‘Hire\' button admin will be redirected to this page.\n' +
        'In this page, admin can check the procurement title,\n' + 'vendor name, total price.\n' + 'Admin can also see a table where there will be Sl no.\n' +
        '</p>\n' + '<ol>\n' + '<li>In economics, a service is a transaction in which</li>\n' + '<li>The benefits of such a service are held to be demonstrated</li>\n' +
        '<li>Buyer\'s willingness to make the exchange</li>\n' + '</ol>');

    quotationList;
    @Output() quotationListChange = new EventEmitter<Quotation[]>();


    constructor(private quotationValidator: ValidatorService,
                private http: ShebaHttpService,
                private router: Router,
                private route: ActivatedRoute,
                private pop: PopAlertService,
                private storage: StorageService,
                public sanitizer: DomSanitizer) {

        this.route.data.subscribe(res => {
            if (res.bidDetails.code === 200) {
                this.bidInformation = res.bidDetails.bid;
                this.proposedPrice.setValue(this.bidInformation.price);
            } else {
                this.pop.open(res.bidDetails.message);
            }
        });

    }

    ngOnInit() {

        if (this.bidInformation.price_quotation) {
            this.quotationList = this.bidInformation.price_quotation.map(item => {
                return {
                    id: item.id,
                    itemName: item.title,
                    specification: item.short_description,
                    unit: JSON.parse(item.variables).unit,
                    price: item.result
                };
            });

            this.dataSource = new TableDataSource<any>(this.quotationList, Quotation, this.quotationValidator);
            this.dataSource.datasourceSubject.subscribe(quotationList => {
                this.quotationList = quotationList;
                this.quotationListChange.emit(quotationList);
            });
        }

    }

    onClickEdit(data) {
        if (data === 1) {
            this.enableTermsAndConditionEditButton = false;
            this.isTermsAndConditionEditable = true;
        }

        if (data === 2) {
            this.enablePolicyEditButton = false;
            this.isPolicyEditable = true;
        }
    }

    onClickSave(data) {
        if (data === 1) {
            this.enableTermsAndConditionEditButton = true;
            this.isTermsAndConditionEditable = false;
            console.log(this.termsAndConditionContent.value);
        }

        if (data === 2) {
            this.enablePolicyEditButton = true;
            this.isPolicyEditable = false;
            console.log(this.policyContent.value);
        }
    }

    getTotalPrice() {
        this.subtotalPrice = this.quotationList.map(t => +t.price).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
        return this.subtotalPrice;
    }

    constructSubmitData(data) {
        return this.submittedData = {
            items: this.bidInformation.type === 'advanced' ? JSON.stringify(data) : '[]',
            terms: this.termsAndConditionContent.value,
            policies: this.policyContent.value,
            price: this.bidInformation.type === 'basic' ? data : this.subtotalPrice
        };
    }

    postToApi(data) {
        const bidId = this.route.snapshot.queryParamMap.get('id');
        const procurementId = this.route.snapshot.queryParamMap.get('procurement');

        this.http.post('v2/businesses/' + this.storage.user.business_id + '/bids/' + bidId + '/hire', data).toPromise().then(res => {
            if (res.code === 200) {
                this.router.navigate(['/', 'dashboard', 'procurement', 'hiring', 'success'], {queryParams: {id: bidId, procurement: procurementId}}).catch(err => {
                    this.pop.open(err);
                });
            } else {
                this.pop.open('Failed');
            }
        });
    }

    sendHireRequest() {

        if (this.bidInformation.type === 'basic') {
            this.proposedPrice.valid ? this.receivedData = this.constructSubmitData(this.proposedPrice.value) : this.pop.open('Please Fill The Form Properly');
            this.postToApi(this.receivedData);
        }

        if (this.bidInformation.type === 'advanced') {
            const data = [{
                id: this.bidInformation.price_quotation[0].bid_item_id,
                fields: this.quotationList.map( res => {
                    return {
                        id: res.id,
                        result: +res.price,
                        unit: res.unit,
                        title: res.itemName,
                        short_description: res.specification
                    };
                })
            }];

            this.receivedData = this.constructSubmitData(data);
            this.postToApi(this.receivedData);
        }
    }

    unitPrice(el) {
        console.log(el.currentData);
        return (parseFloat(el.currentData.price) / el.currentData.unit).toFixed(2);
    }


}
