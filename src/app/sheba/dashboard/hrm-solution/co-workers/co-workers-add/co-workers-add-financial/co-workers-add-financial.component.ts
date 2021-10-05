import {Component, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoWorkersAddService } from '../../co-workers-services/co-workers-add.service';
import { CoWorkersSharedService } from '../../co-workers-services/co-workers-shared.service';
import {Banks, FinancialInfo} from '../../../../../../types/co-workers';
import {CoWorkerStorageService} from '../../../../../../services/co-workers-storage-service/co-worker-storage.service';

@Component({
    selector: 'app-co-workers-add-financial',
    templateUrl: './co-workers-add-financial.component.html',
    styleUrls: ['./co-workers-add-financial.component.scss']
})

export class CoWorkersAddFinancialComponent implements OnDestroy {

    financialInfoForm: FormGroup;
    financialInfoDataFromApi: FinancialInfo;
    coworkerId: string|number;
    banks: Banks[];
    isSaving = false;

    tinCertificateAttachment;
    tinCertificateAttachmentName = null;

    constructor(private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private coWorkerStorageService: CoWorkerStorageService,
                private coWorkersSharedService: CoWorkersSharedService,
                private coWorkersAddService: CoWorkersAddService) {

        this.coworkerId = this.coWorkerStorageService.CoworkerId;

        activatedRoute.parent.data.subscribe(({ coworkersAdd }) => {
            if (coworkersAdd && coworkersAdd.financial_info) {
                this.financialInfoDataFromApi = coworkersAdd.financial_info;
                this.tinCertificateAttachment = coworkersAdd.financial_info.tin_certificate;
                this.tinCertificateAttachmentName = coworkersAdd.financial_info.tin_certificate_name;
            }
        });

        activatedRoute.data.subscribe(({ banksList }) => this.banks = banksList);

        this.constructFinancialInfoForm();

    }

    constructFinancialInfoForm() {
        this.financialInfoForm = this.formBuilder.group({
            tin_number: [ this.financialInfoDataFromApi ? this.financialInfoDataFromApi.tin_no : null ],
            bank_name: [ this.financialInfoDataFromApi ? this.financialInfoDataFromApi.bank_name : null ],
            bank_account_number: [ this.financialInfoDataFromApi ? this.financialInfoDataFromApi.account_no : null ]
        });
    }

    selectTinCertificate(event) {
        const files: FileList = event.target.files;

        if (files.length === 0) {
            return;
        }
        this.tinCertificateAttachment = files[0];
        this.tinCertificateAttachmentName = files[0].name;
    }

    submitFinancialInformation() {
        this.isSaving = true;
        const formData = {
            ...this.financialInfoForm.value,
            tin_certificate: this.tinCertificateAttachment
        };
        const appendedFormData = this.appendFinancialInfoIntoForm(formData);
        this.postToApi(appendedFormData);
    }

    appendFinancialInfoIntoForm(financialInfoForm) {
        const formData = new FormData();

        for (const key of Object.keys(financialInfoForm)) {
            formData.append(key, financialInfoForm[key] ? financialInfoForm[key] : null);
        }

        return formData;
    }

    postToApi(data) {
        this.coWorkersAddService.updateFinancialInformation(this.coworkerId, data).subscribe(
            res => {
                this.isSaving = false;
                if (res.code === 200) {
                    this.successfulMessage();
                    this.updateProfileCompletionScore('add');
                    return;
                }
                this.errorMessage(res.message);
            },
            (error) => {
                this.isSaving = false;
                this.errorMessage(error.message);
            }
        );
    }

    successfulMessage() {
        const message = 'Financial Information Saved Successfully';
        this.coWorkersSharedService.changeCurrentConfirmationStatus(true, true, message);
        this.hideMessage();
    }

    updateProfileCompletionScore(addOrRemoveScore: string) {
        this.coWorkersSharedService.updateCoworkerProfileCompletionScore(addOrRemoveScore);
    }

    errorMessage(message) {
        this.coWorkersSharedService.changeCurrentConfirmationStatus(true, false, message);
        this.hideMessage();
    }

    hideMessage() {
        setTimeout(() => {
            this.coWorkersSharedService.changeCurrentConfirmationStatus(false );
        }, 5000);
    }

    ngOnDestroy() {
        this.coWorkersSharedService.changeCurrentConfirmationStatus(false);
    }

}
