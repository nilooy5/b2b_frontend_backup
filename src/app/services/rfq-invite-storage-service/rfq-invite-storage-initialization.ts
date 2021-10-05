import {RfqVendors} from '../../types/rfq';

export class RfqInviteStorageInitialization {

    ownListedSelectedVendors: RfqVendors[]; // Selected List of Business Vendor List
    shebaVerifiedSelectedVendors: RfqVendors[]; // Selected List of Sheba Verified Vendors [ That is not available in Businesses Vendors List ]
    storedShebaVerifiedVendors: RfqVendors[];
    selectedVendorsCount: number;
    tenderId: number;

    constructor() {
        this.init();
    }

    set(item: string, value) {
        this[item] = value;
    }

    init() {
        const rfqInviteFromStorage = sessionStorage.getItem('rfq-invite') && sessionStorage.getItem('rfq-invite') !== undefined ?
            JSON.parse(sessionStorage.getItem('rfq-invite')) : null;

        this.ownListedSelectedVendors = rfqInviteFromStorage ? rfqInviteFromStorage.ownListedSelectedVendors : null;
        this.shebaVerifiedSelectedVendors = rfqInviteFromStorage ? rfqInviteFromStorage.shebaVerifiedSelectedVendors : null;
        this.storedShebaVerifiedVendors = rfqInviteFromStorage ? rfqInviteFromStorage.storedShebaVerifiedVendors : null;
        this.selectedVendorsCount = rfqInviteFromStorage ? rfqInviteFromStorage.selectedVendorsCount : null;
        this.tenderId = rfqInviteFromStorage ? rfqInviteFromStorage.tenderId : null;
    }

    getRfqInviteObject(): RfqInviteStorageInitialization {
        return {
            ownListedSelectedVendors: this.ownListedSelectedVendors,
            shebaVerifiedSelectedVendors: this.shebaVerifiedSelectedVendors,
            storedShebaVerifiedVendors: this.storedShebaVerifiedVendors,
            selectedVendorsCount: this.selectedVendorsCount,
            tenderId: this.tenderId,
        } as RfqInviteStorageInitialization;
    }

    get() {
        const rfqInviteFromStorage = sessionStorage.getItem('rfq-invite') && sessionStorage.getItem('rfq-invite') !== undefined ?
            JSON.parse(sessionStorage.getItem('rfq-invite')) : null;

        const rfqInviteFromClass = this.getRfqInviteObject();

        return rfqInviteFromStorage || rfqInviteFromClass;
    }

    resetRfqInviteObject() {
        this.init();
    }

    removeAll() {
        this.reset();
    }

    reset() {
        this.ownListedSelectedVendors = null;
        this.shebaVerifiedSelectedVendors = null;
        this.storedShebaVerifiedVendors = null;
        this.selectedVendorsCount = null;
        this.tenderId = null;
    }
}
