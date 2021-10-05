import { Injectable } from '@angular/core';
import {StorageService} from '../storage.service';
import {RfqVendors} from '../../types/rfq';

@Injectable({
    providedIn: 'root'
})

export class RfqInviteStorageService {

    ownListedSelectedVendors: RfqVendors[]; // Selected List of Business Vendor List
    shebaVerifiedSelectedVendors: RfqVendors[]; // Selected List of Sheba Verified Vendors [ That is not available in Businesses Vendors List ]
    storedShebaVerifiedVendors: RfqVendors[];
    selectedVendorsCount: number;
    tenderId: number;

    constructor(private storage: StorageService) { }

    init() {
        this.ownListedSelectedVendors = null;
        this.shebaVerifiedSelectedVendors = null;
        this.storedShebaVerifiedVendors = null;
        this.selectedVendorsCount = null;
        this.tenderId = null;
    }

    set OwnListedSelectedVendors(ownListedSelectedVendors: RfqVendors[]) {
        this.ownListedSelectedVendors = ownListedSelectedVendors;
        this.updateRfqInviteStorage('ownListedSelectedVendors', this.ownListedSelectedVendors);
    }

    get OwnListedSelectedVendors() {
        const ownListedSelectedVendors = this.storage.RfqInvite.ownListedSelectedVendors;
        return ownListedSelectedVendors || this.ownListedSelectedVendors;
    }

    set ShebaVerifiedSelectedVendors(shebaVerifiedSelectedVendors: RfqVendors[]) {
        this.shebaVerifiedSelectedVendors = shebaVerifiedSelectedVendors;
        this.updateRfqInviteStorage('shebaVerifiedSelectedVendors', this.shebaVerifiedSelectedVendors);
    }

    get ShebaVerifiedSelectedVendors() {
        const shebaVerifiedSelectedVendors = this.storage.RfqInvite.shebaVerifiedSelectedVendors;
        return shebaVerifiedSelectedVendors || this.shebaVerifiedSelectedVendors;
    }

    set StoredShebaVerifiedVendors(storedShebaVerifiedVendors: RfqVendors[]) {
        this.storedShebaVerifiedVendors = storedShebaVerifiedVendors;
        this.updateRfqInviteStorage('storedShebaVerifiedVendors', this.storedShebaVerifiedVendors);
    }

    get StoredShebaVerifiedVendors() {
        const storedShebaVerifiedVendors = this.storage.RfqInvite.storedShebaVerifiedVendors;
        return storedShebaVerifiedVendors || this.storedShebaVerifiedVendors;
    }

    set SelectedVendorsCount(selectedVendorsCount: number) {
        this.selectedVendorsCount = selectedVendorsCount;
        this.updateRfqInviteStorage('selectedVendorsCount', this.selectedVendorsCount);
    }

    get SelectedVendorsCount() {
        const selectedVendorsCount = this.storage.RfqInvite.selectedVendorsCount;
        return selectedVendorsCount || this.selectedVendorsCount;
    }

    set TenderId(tenderId: number) {
        this.tenderId = tenderId;
        this.updateRfqInviteStorage('tenderId', this.tenderId);
    }

    get TenderId() {
        const tenderId = this.storage.RfqInvite.tenderId;
        return tenderId || this.tenderId;
    }

    resetRfqInviteStorage() {
        this.init();
        this.storage.resetRfqInviteObject();
    }

    updateRfqInviteStorage(key, value) {
        this.storage.updateRfqInviteObject(key, value);
    }

    removeRfqFromStorage() {
        this.init();
        this.storage.removeRfqInviteObject();
    }
}
