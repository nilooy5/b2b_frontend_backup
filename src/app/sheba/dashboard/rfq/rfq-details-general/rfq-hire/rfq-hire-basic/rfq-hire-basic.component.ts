import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';

@Component({
    selector: 'app-rfq-hire-basic',
    templateUrl: './rfq-hire-basic.component.html',
    styleUrls: ['./rfq-hire-basic.component.scss']
})
export class RfqHireBasicComponent implements OnInit {

    @Input() quotationDetails;
    @Input() rfqID;
    proposedPrice: FormGroup;
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
                private fb: FormBuilder,
                private pop: PopAlertService,
                private http: ShebaHttpService,
                private storage: StorageService) {
    }

    ngOnInit() {
        this.proposedPrice = this.fb.group({
            proposed_price: new FormControl(this.quotationDetails.price.toString(), Validators.required),
        });
        this.termsAndConditionContent = new FormControl(this.quotationDetails.terms);
        this.policyContent = new FormControl(this.quotationDetails.policies);
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
        const data = this.proposedPrice.getRawValue();
        const price = data.proposed_price;
        if (price) {
            if (price.match(/^[0-9]+$/)) {
                const api_data = this.getApiData(price);
                this.postToApi(api_data);
            } else {
                this.pop.open('Proposed Quotation must be number');
            }
        } else {
            this.pop.open('Proposed Quotation is required');
        }
    }

    getApiData(value) {
        const post_data = {
            items: '[]',
            terms: this.termsAndConditionContent.value,
            policies: this.policyContent.value,
            price: value
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
