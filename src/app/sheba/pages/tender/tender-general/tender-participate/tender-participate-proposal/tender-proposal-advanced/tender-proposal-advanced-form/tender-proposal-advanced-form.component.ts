import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TenderVerifyPhoneComponent} from '../../../../../../../modals/tender-verify-phone/tender-verify-phone.component';
import {ShebaHttpService} from '../../../../../../../../modules/sheba-http/sheba-http.service';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {TenderProposalAdvancedStorageService} from '../../../../../../../../services/tender-proposal-advanced-storage-service/tender-proposal-advanced-storage.service';
import {environment} from '../../../../../../../../../environments/environment';

@Component({
    selector: 'app-tender-proposal-advanced-form',
    templateUrl: './tender-proposal-advanced-form.component.html',
    styleUrls: ['./tender-proposal-advanced-form.component.scss']
})

export class TenderProposalAdvancedFormComponent implements OnInit {

    @Input() tender;
    @Input() currentState;
    @Input() totalStates;

    tenderForm;
    quotationForm;
    companyEvalForm;
    techEvalForm;

    stateIndex = 0;
    @Output() nextStateIndex = new EventEmitter();

    constructor(private http: ShebaHttpService,
                private dialog: MatDialog,
                private tenderParticipateStorage: TenderProposalAdvancedStorageService) {
    }

    ngOnInit() {
        this.currentState = 'form';
        console.log(this.totalStates);
    }

    incrementState($event) {
        this.stateIndex += $event;
        this.sendStateIndex();
    }

    sendStateIndex() {
        this.nextStateIndex.emit(this.stateIndex);
    }

    receiveForm($event) {
        this.tenderForm = $event;
        this.tenderParticipateStorage.BasicForm = this.tenderForm.value;
        console.log(this.tenderParticipateStorage.BasicForm);
    }

    receiveQuotation($event) {
        this.quotationForm = $event;
        this.tenderParticipateStorage.PriceQuotations = this.quotationForm;
        console.log(this.quotationForm);
    }

    receiveCompanyEvalForm($event) {
        this.companyEvalForm = $event;
        this.tenderParticipateStorage.CompanyEvaluation = this.companyEvalForm;
        console.log(this.companyEvalForm);
    }

    receiveTechEvalForm($event) {
        this.techEvalForm = $event;
        this.tenderParticipateStorage.TechnicalEvaluation = this.techEvalForm;
    }

    receiveLastStepAlert($event) {
        this.submitProposal();
    }

    submitProposal() {
        const basicData = this.tenderForm.value;
        const advancedItems = [];

        if (this.tender.price_quotation) {
            const quotationData = {
                id: this.tender.price_quotation[0].id,
                fields: this.quotationForm
            };
            advancedItems.push(quotationData);
        }

        if (this.tender.technical_evaluation) {
            const technicalEvalData = {
                id: this.tender.technical_evaluation[0].id,
                fields: this.techEvalForm
            };
            advancedItems.push(technicalEvalData);
        }

        if (this.tender.company_evaluation) {
            const companyEvalData = {
                id: this.tender.company_evaluation[0].id,
                fields: this.companyEvalForm
            };
            advancedItems.push(companyEvalData);
        }

        const advancedFormData = {items: JSON.stringify(advancedItems)};

        const formattedData = {...basicData, ...advancedFormData};
        this.submitForm(formattedData);
    }

    submitForm(formattedData) {
        const data = formattedData;
        const url = 'v2/businesses/tenders/' + this.tender.id + '/proposal';
        this.openOTPModal(data.company_phone, data, url, this.tender.id);
    }

    openOTPModal(phone, proposalData, postUrl, tenderId) {
        const account_url = 'api/v1/accountkit/generate/token?app_id=' + environment.account_kit_app_id;
        this.http.getFromAccountsApi(account_url).toPromise().then(res => {
            if (res.code === 200) {
                const res_token = res.token;
                const data = {
                    type: 'default',
                    title: 'Enter phone number',
                    text: 'We will send you a verification to this number to verify yourself ',
                    actionText: 'CONTINUE',
                    token: res_token,
                    phoneNo: phone,
                    skipToPin: true,
                    tenderData: proposalData,
                    apiEnd: postUrl,
                    tenderID: tenderId
                };

                this.dialog.open(TenderVerifyPhoneComponent, {
                    data,
                    width: '570px',
                    height: '450px',
                    panelClass: 'dialog-confirmation'
                });
            } else {
                console.log('error');
            }
        });
    }
}
