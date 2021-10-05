import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';
import {AdditionalInformation, Attachment, BasicInformation, Evaluation, PriceQuotation, RfqValidation} from '../../types/rfq';

@Injectable()

export class RfqStorageService {

    basicInformation: BasicInformation;
    additionalInformation: AdditionalInformation;
    attachments: Attachment[];
    priceQuotation: PriceQuotation[];
    technicalEvaluation: Evaluation[];
    companyEvaluation: Evaluation[];
    rfqValidation: RfqValidation;

    constructor(private storage: StorageService) { }

    init() {
        this.basicInformation = null;
        this.additionalInformation = null;
        this.attachments = null;
        this.priceQuotation = null;
        this.technicalEvaluation = null;
        this.companyEvaluation = null;
        this.rfqValidation = {
            hasTitle: false,
            hasDescription: false,
            hasBudget: false,
            hasTags: false,
            hasAttachment: false
        };
    }

    set BasicInformation(basicInformation: BasicInformation) {
        this.basicInformation = basicInformation;
        this.updateRfqStorage('basicInformation', this.basicInformation);
    }

    get BasicInformation() {
        const basicInformation = this.storage.Rfq.basicInformation;
        return basicInformation || this.basicInformation;
    }

    set AdditionalInformation(additionalInformation: AdditionalInformation) {
        this.additionalInformation = additionalInformation;
        this.updateRfqStorage('additionalInformation', this.additionalInformation);
    }

    get AdditionalInformation() {
        const additionalInformation = this.storage.Rfq.additionalInformation;
        return additionalInformation || this.additionalInformation;
    }

    set Attachments(attachments: Attachment[]) {
        this.attachments = attachments;
        this.updateRfqStorage('attachments', this.attachments);
    }

    get Attachments() {
        const attachments = this.storage.Rfq.attachments;
        return attachments || this.attachments;
    }

    set PriceQuotation(priceQuotation: PriceQuotation[]) {
        this.priceQuotation = priceQuotation;
        this.updateRfqStorage('priceQuotation', this.priceQuotation);
    }

    get PriceQuotation() {
        const priceQuotation = this.storage.Rfq.priceQuotation;
        return priceQuotation || this.priceQuotation;
    }

    set CompanyEvaluation(companyEvaluation: Evaluation[]) {
        this.companyEvaluation = companyEvaluation;
        this.updateRfqStorage('companyEvaluation', this.companyEvaluation);
    }

    get CompanyEvaluation() {
        const companyEvaluation = this.storage.Rfq.companyEvaluation;
        return companyEvaluation || this.companyEvaluation;
    }

    set TechnicalEvaluation(technicalEvaluation: Evaluation[]) {
        this.technicalEvaluation = technicalEvaluation;
        this.updateRfqStorage('technicalEvaluation', this.technicalEvaluation);
    }

    get TechnicalEvaluation() {
        const technicalEvaluation = this.storage.Rfq.technicalEvaluation;
        return technicalEvaluation || this.technicalEvaluation;
    }

    set RfqValidation(rfqValidation: RfqValidation) {
        this.rfqValidation = { ...this.rfqValidation, ...rfqValidation };
        this.updateRfqStorage('rfqValidation', this.rfqValidation);
    }

    get RfqValidation() {
        const rfqValidation = this.storage.Rfq.rfqValidation;
        return rfqValidation || this.rfqValidation;
    }

    resetRfqStorage() {
        this.init();
        this.storage.resetRfqObject();
    }

    updateRfqStorage(key, value) {
        this.storage.updateRfqObject(key, value);
    }

    removeRfqFromStorage() {
        this.init();
        this.storage.removeRfqObject();
    }


}
