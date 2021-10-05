import {Injectable} from '@angular/core';
import {StorageService} from '../storage.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TenderProposalAdvancedStorageService {

    private basicForm: any = null;
    private priceQuotation: any = null;
    private companyEvaluation: any = null;
    private technicalEvaluation: any = null;

    constructor(
        private storage: StorageService
    ) {
        this.init();
    }

    init() {
        this.basicForm = null;
        this.priceQuotation = null;
        this.companyEvaluation = null;
        this.technicalEvaluation = null;
    }

    set BasicForm(basicForm) {
        this.basicForm = basicForm;
        this.updateTenderParticipateStorage('basicForm', this.basicForm);
    }
    get BasicForm() {
        return this.storage.TenderParticipate.basicForm || this.basicForm;
    }

    set PriceQuotations(priceQuotation) {
        this.priceQuotation = priceQuotation;
        this.updateTenderParticipateStorage('priceQuotation', this.priceQuotation);
    }
    get PriceQuotation() {
        return this.storage.TenderParticipate.priceQuotation || this.priceQuotation;
    }

    set CompanyEvaluation(companyEvaluation) {
        this.companyEvaluation = companyEvaluation;
        this.updateTenderParticipateStorage('companyEvaluation', this.companyEvaluation);
    }
    get CompanyEvaluation() {
        return this.storage.TenderParticipate.companyEvaluation || this.companyEvaluation;
    }

    set TechnicalEvaluation(technicalEvaluation) {
        this.technicalEvaluation = technicalEvaluation;
        this.updateTenderParticipateStorage('technicalEvaluation', this.technicalEvaluation);
    }
    get TechnicalEvaluation() {
        return this.storage.TenderParticipate.technicalEvaluation || this.technicalEvaluation;
    }

    updateTenderParticipateStorage(key, value) {
        this.storage.updateTenderParticipateObject(key, value);
    }

    clearStorage() {
        this.init();
        this.storage.removeTenderParticipateObject();
    }

}
