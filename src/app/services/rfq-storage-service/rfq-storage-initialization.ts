import {AdditionalInformation, Attachment, BasicInformation, Evaluation, PriceQuotation, RfqValidation} from '../../types/rfq';

export class RfqStorageInitialization {
    basicInformation: BasicInformation;
    additionalInformation: AdditionalInformation;
    attachments: Attachment[];
    priceQuotation: PriceQuotation[];
    technicalEvaluation: Evaluation[];
    companyEvaluation: Evaluation[];
    rfqValidation: RfqValidation;

    constructor() {
        this.init();
    }

    set(item: string, value) {
        this[item] = value;
    }

    init() {
        const rfqFromStorage = localStorage.getItem('rfq') && localStorage.getItem('rfq') !== undefined ?
            JSON.parse(localStorage.getItem('rfq')) : null;

        this.basicInformation = rfqFromStorage ? rfqFromStorage.basicInformation : null;
        this.additionalInformation = rfqFromStorage ? rfqFromStorage.additionalInformation : null;
        this.attachments = rfqFromStorage ? rfqFromStorage.attachments : null;
        this.priceQuotation = rfqFromStorage ? rfqFromStorage.priceQuotation : null;
        this.technicalEvaluation = rfqFromStorage ? rfqFromStorage.technicalEvaluation : null;
        this.companyEvaluation = rfqFromStorage ? rfqFromStorage.companyEvaluation : null;
        this.rfqValidation = rfqFromStorage ? rfqFromStorage.rfqValidation : { hasTitle: false, hasDescription: false, hasBudget: false, hasTags: false, hasAttachment: false};
    }

    getRfqObject(): RfqStorageInitialization {
        return {
            basicInformation: this.basicInformation,
            additionalInformation: this.additionalInformation,
            attachments: this.attachments,
            priceQuotation: this.priceQuotation,
            technicalEvaluation: this.technicalEvaluation,
            companyEvaluation: this.companyEvaluation,
            rfqValidation: this.rfqValidation
        } as RfqStorageInitialization;
    }

    get() {
        const rfqFromStorage = localStorage.getItem('rfq') && localStorage.getItem('rfq') !== undefined ?
            JSON.parse(localStorage.getItem('rfq')) : null;

        const rfqFromClass = this.getRfqObject();

        return rfqFromStorage || rfqFromClass;
    }

    resetRfqObject() {
        this.init();
    }

    removeAll() {
        this.reset();
    }

    reset() {
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

    // init() {
    //     // const rfqFromLocalStorage = localStorage.getItem('rfq') && localStorage.getItem('rfq') !== undefined ?
    //     //     JSON.parse(localStorage.getItem('rfq')) : null;
    //     //
    //     // this.basicInformation = rfqFromLocalStorage ? rfqFromLocalStorage.basicInformation : null;
    //     // this.additionalInformation = rfqFromLocalStorage ? rfqFromLocalStorage.additionalInformation : null;
    //     // this.attachments = rfqFromLocalStorage ? rfqFromLocalStorage.attachments : null;
    //     // this.priceQuotation = rfqFromLocalStorage ? rfqFromLocalStorage.priceQuotation : null;
    //     // this.technicalEvaluation = rfqFromLocalStorage ? rfqFromLocalStorage.technicalEvaluation : null;
    //     // this.companyEvaluation = rfqFromLocalStorage ? rfqFromLocalStorage.companyEvaluation : null;
    // }

    // removeAll() {
    //     this.reset();
    // }

    // public getLocalObject() {
    //     return {
    //         basicInformation: this.basicInformation,
    //         additionalInformation: this.additionalInformation,
    //         attachments: this.attachments,
    //         priceQuotation: this.priceQuotation,
    //         technicalEvaluation: this.technicalEvaluation,
    //         companyEvaluation: this.companyEvaluation,
    //     };
    // }

    // get() {
    //     const tenderFromLocalStorage = localStorage.getItem('rfq') && localStorage.getItem('rfq') !== undefined ?
    //         JSON.parse(localStorage.getItem('rfq')) : null;
    //
    //     const rfqFromClass = this.getLocalObject();
    //
    //     return tenderFromLocalStorage || rfqFromClass;
    // }


}
