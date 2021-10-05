import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TenderService} from '../../../../../../services/tender-service/tender.service';
import {StorageService} from '../../../../../../services/storage.service';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {PopAlertService} from '../../../../../../modules/pop-alert/pop-alert.service';
import {DatePipe} from '@angular/common';
import {HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-procurement-tender-add-summary',
    templateUrl: './procurement-tender-add-summary.component.html',
    styleUrls: ['./procurement-tender-add-summary.component.scss'],
    encapsulation: ViewEncapsulation.Emulated,
    providers: [DatePipe]
})

export class ProcurementTenderAddSummaryComponent implements OnInit {


    status;
    displayedColumns = ['serialNo', 'itemName', 'specification', 'unit'];
    submittedData;
    deliveryDate;
    generalInformation;
    additionalInformation;
    priceQuotationDataSource;
    technicalEvaluationQuestions;
    companyEvaluationQuestions;
    arr: any[] = [];
    submitting = false;
    publishing = false;
    savingAsDraft = false;

    constructor(private tenderService: TenderService,
                private storage: StorageService,
                private router: Router,
                public dialog: MatDialog,
                public pop: PopAlertService,
                private datePipe: DatePipe,
                private http: ShebaHttpService
    ) {
        this.generalInformation = this.tenderService.Tender;
        this.additionalInformation = this.tenderService.AdditionalInformation;
        this.priceQuotationDataSource = this.tenderService.PriceQuotation;
        this.technicalEvaluationQuestions = this.tenderService.TechnicalEvaluationData;
        this.companyEvaluationQuestions = this.tenderService.CompanyEvaluationData;
        this.deliveryDate = this.tenderService.Tender ? this.tenderService.Tender.delivery_date.from + ' - ' + this.tenderService.Tender.delivery_date.to : null;
        this.status = this.tenderService.Tender.is_advanced;
    }

    ngOnInit() { }

    generateItems() {
        const items = [];

        if (this.priceQuotationDataSource) {
            items.push({
                item_type: 'price_quotation',
                fields: this.priceQuotationDataSource
            });
        }

        if (this.companyEvaluationQuestions) {
            items.push({
                item_type: 'company_evaluation',
                fields: this.companyEvaluationQuestions
            });
        }

        if (this.technicalEvaluationQuestions) {
            items.push({
                item_type: 'technical_evaluation',
                fields: this.technicalEvaluationQuestions
            });
        }

        // this.tenderService.tender.needs_company_evaluation === true
        // this.tenderService.tender.needs_technical_evaluation === true

        return JSON.stringify(items);
    }

    dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type: mime});
    }

    constructSubmitData(isPublished) {
        return this.submittedData = {
            title: this.generalInformation.title,
            number_of_participants: this.generalInformation.no_of_vendors,
            labels: JSON.stringify(this.generalInformation.labels),
            last_date_of_submission: this.datePipe.transform(this.generalInformation.last_date_of_submission, 'yyyy-MM-dd'),
            procurement_start_date: this.datePipe.transform(this.generalInformation.delivery_date.from, 'yyyy-MM-dd'),
            procurement_end_date: this.datePipe.transform(this.generalInformation.delivery_date.to, 'yyyy-MM-dd'),
            payment_options: this.generalInformation.payment_option,
            type: this.generalInformation.is_advanced === true ? 'advanced' : 'basic',
            is_published: isPublished,
            description: this.additionalInformation,
            items: this.generateItems()
        };
    }
    inviteVendors(isPublished) {
        const submitData = this.constructSubmitData(isPublished);
        this.postAndRedirectToVendorInvitation(submitData, isPublished);
    }

    postAndRedirectToVendorInvitation(submitData, isPublished) {

        const formData = new FormData();

        for (const key in submitData) {
            formData.append(key, submitData[key]);
        }

        console.log(isPublished);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.generalInformation.attachments.length; i++) {
            const file = this.dataURLtoFile(this.generalInformation.attachments[i].file , this.generalInformation.attachments[i].name);
            this.arr.push(file);
            formData.append('attachments[]', file);
        }

        this.submitting = true;
        isPublished === 0 ? this.savingAsDraft = true : this.publishing = true;
        this.http.post('/v2/businesses/' + this.storage.user.business_id + '/procurements', formData).toPromise().then(res => {
            if (res.code === 200) {
                this.submitting = false;
                this.router.navigate(['/', 'dashboard', 'procurement', 'invite'], {queryParams: {fromSummary: 'true', procurement: res.id}}). catch(err => {
                    this.pop.open(err);
                });
            } else {
                this.pop.open('Failed');
            }
        });
    }

    submitProcurement(isPublished) {
        const submitData = this.constructSubmitData(isPublished);
        this.postToApi(submitData, isPublished);
    }

    viewImage(file) {
        const newTab = window.open();
        newTab.document.body.innerHTML = '<img src=\"' + file + '\" alt="" />';
    }

    postToApi(submitData, isPublished) {

        const formData = new FormData();

        for (const key in submitData) {
            formData.append(key, submitData[key]);
        }

        console.log(isPublished);

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.generalInformation.attachments.length; i++) {
            const file = this.dataURLtoFile(this.generalInformation.attachments[i].file , this.generalInformation.attachments[i].name);
            this.arr.push(file);
            formData.append('attachments[]', file);
        }

        this.submitting = true;
        isPublished === 0 ? this.savingAsDraft = true : this.publishing = true;
        this.http.post('/v2/businesses/' + this.storage.user.business_id + '/procurements', formData).toPromise().then(res => {
            if (res.code === 200) {
                this.submitting = false;
                this.router.navigate(['/', 'dashboard', 'procurement', 'create', 'success'], {queryParams: {publish: submitData.is_published, procurementId: res.id}}).catch(err => {
                    this.pop.open(err);
                });
            } else {
                this.pop.open('Failed');
            }
        });

    }

    limitString(str) {
        return (str && str.length > 30) ? str.slice(0, 30) + '..' : str;
    }
}
