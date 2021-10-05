import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {FormControl} from '@angular/forms';
import {TableDataSource} from 'angular4-material-table';
import {NumericFormat} from '../../../../../../helpers/numeric_format.service';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
    selector: 'app-rfq-hire-advance',
    templateUrl: './rfq-hire-advance.component.html',
    styleUrls: ['./rfq-hire-advance.component.scss']
})
export class RfqHireAdvanceComponent implements OnInit {

    newForm = [];
    isFormValid = true;
    totalPrice = 0;
    @Input() quotationDetails;
    @Input() rfqID;
    dataSource: TableDataSource<any>;
    displayedColumns = ['serialNo', 'itemName', 'specification', 'unit', 'quoted', 'final'];
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
    termsAndConditionContent;
    policyContent;
    enableTermsEdit = false;
    enablePolicyEdit = false;

    constructor(private router: Router,
                public sanitizer: DomSanitizer,
                public numericFormat: NumericFormat,
                private pop: PopAlertService,
                private http: ShebaHttpService,
                private storage: StorageService) {
    }

    ngOnInit() {
        if (this.quotationDetails.price_quotation) {
            this.dataSource = this.quotationDetails.price_quotation;
            this.newForm = this.quotationDetails.price_quotation.map((item) => {
                return {
                    id: item.field_id,
                    result: item.result.toString(),
                    unit: item.unit,
                    title: item.title,
                    short_description: item.short_description
                };
            });
        }
        console.log(this.newForm);
        this.termsAndConditionContent = new FormControl(this.quotationDetails.terms);
        this.policyContent = new FormControl(this.quotationDetails.policies);
        if (this.quotationDetails.price_quotation) {
            this.totalPrice = this.getTotalPrice();
        } else {
            this.totalPrice = this.quotationDetails.price;
        }
    }

    emitOnFormChange(index, event: Event) {
        const target = event.target as HTMLInputElement;
        this.newForm[index].result = target.value;
        this.checkFormValidity();
        this.calculateTotalPrice();
    }

    checkFormValidity() {
        let validator = 0;
        for (let i = 0; i < this.newForm.length; i++) {
            if (this.newForm[i].result.length) {
                validator++;
            }
        }
        this.isFormValid = (validator === this.newForm.length);
    }

    calculateTotalPrice() {
        let sum = 0;
        for (let i = 0; i < this.newForm.length; i++) {
            sum = sum + Number(this.newForm[i].result);
        }
        this.totalPrice = sum;
    }

    getTotalPrice() {
        const quotationList = this.quotationDetails.price_quotation;
        let subtotalPrice = 0;
        subtotalPrice = quotationList.map(t => +t.result).reduce((acc, value) => parseFloat(acc) + parseFloat(value), 0);
        return subtotalPrice;
    }

    viewQuotation() {
        const tenderID = this.rfqID;
        const bidID = this.quotationDetails.id;
        this.router.navigate(['/', 'dashboard', 'rfq', 'list', tenderID, 'biddings', bidID]);
    }

    onClickEdit(value) {
        if (value === 1) { this.enableTermsEdit = true; }
        if (value === 2) { this.enablePolicyEdit = true; }
    }

    sendHire() {
        let price_data;
        if (this.quotationDetails.price_quotation) {
            price_data = {
                id: this.quotationDetails.price_quotation[0].id,
                fields: this.newForm
            };
        } else {
            price_data = [];
        }
        const pride_data_array = [];
        pride_data_array.push(price_data);

        if (this.isFormValid) {
            const api_data = this.getApiData(pride_data_array);
            this.postToApi(api_data);
        } else {
            this.pop.open('Please Fill All the Price Quotation Fields');
        }
    }

    getApiData(value) {
        const post_data = {
            items: this.quotationDetails.price_quotation ? JSON.stringify(value) : '[]',
            terms: this.termsAndConditionContent.value,
            policies: this.policyContent.value,
            price: this.totalPrice
        };
        return post_data;
    }

    postToApi(data) {
        const bidID = this.quotationDetails.id;
        this.http.post('v2/businesses/' + this.storage.user.business_id + '/bids/' + bidID + '/hire', data).toPromise().then(res => {
            if (res.code === 200) {
                this.pop.open('Hiring Request Successful');
                this.router.navigate(['/', 'dashboard', 'rfq', 'list', this.rfqID, 'biddings', bidID]);
            } else {
                this.pop.open(res.message);
            }
        });
    }
}
