import { Injectable } from '@angular/core';
import {StorageService} from '../storage.service';
import {Tender} from '../../models/tender';

@Injectable({
    providedIn: 'root'
})
export class TenderService {

    title: any = null;
    additionalInformation: any;
    priceQuotation: any[];
    technicalEvaluationData: any[];
    companyEvaluationData: any[];
    tender: Tender = null;

    constructor(private storage: StorageService) { }

    init() {
        this.tender = null;
        this.additionalInformation = null;
        this.priceQuotation = null;
        this.companyEvaluationData = null;
        this.technicalEvaluationData = null;
    }

    set Title(title: any) {
        this.title = title;
        this.updateStorage('title', this.title);
    }

    get Title() {
        const title = this.storage.Tender.title;
        return title || this.title;
    }

    set AdditionalInformation(additionalInformation: any) {
        this.additionalInformation = additionalInformation;
        this.updateStorage('additionalInformation', this.additionalInformation);
    }

    get AdditionalInformation() {
        const additionalInformation = this.storage.Tender.additionalInformation;
        return additionalInformation || this.additionalInformation;
    }

    set PriceQuotation(priceQuotation: any) {
        this.priceQuotation = priceQuotation;
        this.updateStorage('priceQuotation', this.priceQuotation);
    }

    get PriceQuotation() {
        const priceQuotation = this.storage.Tender.priceQuotation;
        return priceQuotation || this.priceQuotation;
    }

    set Tender(tender: Tender) {
        this.tender = tender;
        this.updateStorage('_tender', this.tender);
    }

    get Tender() {
        return this.tender || this.storage.Tender._tender;
    }

    set CompanyEvaluationData(companyEvaluationData: any) {
        this.companyEvaluationData = companyEvaluationData;
        this.updateStorage('companyEvaluationData', this.companyEvaluationData);
    }

    get CompanyEvaluationData() {
        const companyEvaluationData = this.storage.Tender.companyEvaluationData;
        return companyEvaluationData || this.companyEvaluationData;
    }

    set TechnicalEvaluationData(technicalEvaluationData: any) {
        this.technicalEvaluationData = technicalEvaluationData;
        this.updateStorage('technicalEvaluationData', this.technicalEvaluationData);
    }

    get TechnicalEvaluationData() {
        const technicalEvaluationData = this.storage.Tender.technicalEvaluationData;
        return technicalEvaluationData || this.technicalEvaluationData;
    }

    updateStorage(key, value) {
        this.storage.updateTenderObject(key, value);
    }

    clearStorage() {
        this.init();
        this.storage.removeTenderObject();
    }

}
