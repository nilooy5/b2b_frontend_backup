import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TenderFilterTags} from '../../../../../../types/tender';
import {RfqInviteStorageService} from '../../../../../../services/rfq-invite-storage-service/rfq-invite-storage.service';
import {FormControl} from '@angular/forms';
import {debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import {RfqInviteService} from '../../../rfq-services/rfq-invite/rfq-invite.service';
import {RfqVendors} from '../../../../../../types/rfq';

@Component({
    selector: 'app-vendor-invitation',
    templateUrl: './vendor-invitation.component.html',
    styleUrls: ['./vendor-invitation.component.scss']
})

export class VendorInvitationComponent implements OnInit {

    @Output() vendorCountEmitter: EventEmitter<number> = new EventEmitter();

    noVendorFound = false;
    notFoundType: string;
    vendors: RfqVendors[];
    searchFormControl = new FormControl();
    shebaVerifiedVendors;

    selectedVendors: RfqVendors[] = [];
    selectedVendorsCount = 0;

    verifyVendors: RfqVendors[] = [];
    selectedVerifiedVendors: RfqVendors[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private rfqInviteService: RfqInviteService,
                private rfqInviteStorageService: RfqInviteStorageService) {
        this.setVendors();
        this.retrieveDataFromSessionStorage();
    }

    ngOnInit() {
        this.watchSearchInputChanges();
    }

    setVendors() {
        this.activatedRoute.data.subscribe(({ vendorList }) => {
            if (vendorList.own_vendors.length) {
                this.vendors = vendorList.own_vendors;
            } else {
                this.noVendorFound = true;
                this.notFoundType = 'hasVendorInBusinessesList';
            }
        });
    }

    retrieveDataFromSessionStorage() {
        if (this.rfqInviteStorageService.OwnListedSelectedVendors) {
            this.selectedVendors = this.rfqInviteStorageService.OwnListedSelectedVendors;
        }
        if (this.rfqInviteStorageService.ShebaVerifiedSelectedVendors) {
            this.selectedVerifiedVendors = this.rfqInviteStorageService.ShebaVerifiedSelectedVendors;
        }
        if (this.rfqInviteStorageService.StoredShebaVerifiedVendors) {
            this.verifyVendors = this.rfqInviteStorageService.StoredShebaVerifiedVendors;
        }
        if (this.rfqInviteStorageService.SelectedVendorsCount) {
            this.selectedVendorsCount = this.rfqInviteStorageService.SelectedVendorsCount;
        }
    }

    watchSearchInputChanges() {
        this.searchFormControl.valueChanges
            .pipe(
                debounceTime(500),
                switchMap(value => {
                    if (value !== '') {
                        return this.rfqInviteService.getVendorsList({ q: value });
                    }
                    return this.rfqInviteService.getVendorsList();
                })
            )
            .subscribe((response) => {
                const { own_vendors, sheba_verified_vendors } = response;
                if (own_vendors.length === 0) {
                    this.notFoundVendorScreen(sheba_verified_vendors);
                    return;
                }
                // if (own_vendors.length === 0 && sheba_verified_vendors.length > 0) {
                //     this.foundShebaVerifiedVendors(sheba_verified_vendors);
                // }
                this.noVendorFound = false;
                this.vendors = own_vendors;
            });
    }

    notFoundVendorScreen(verifiedVendors: RfqVendors[]) {
        if (this.selectedVendors.length === 0 && verifiedVendors.length === 0) {
            this.noVendorFound = true;
            this.notFoundType = 'noVendorFound';
        }

        if (this.selectedVendors.length > 0 && verifiedVendors.length === 0) {
            this.noVendorFound = true;
            this.notFoundType = 'noVendorButOthersSelected';
        }

        if (verifiedVendors.length > 0) {
            this.noVendorFound = true;
            this.shebaVerifiedVendors = verifiedVendors;
            this.notFoundType = 'noVendorButHasShebaVerified';
        }
    }

    onSelectVendor(vendor: RfqVendors, vendorSelectionType: string, storageKey: string) {
        const index = this[vendorSelectionType].findIndex((item) => item.id === vendor.id);
        if (index === -1) {
            this[vendorSelectionType].push(vendor);
            this.selectedVendorsCount += 1;
        } else {
            this[vendorSelectionType].splice(index, 1);
            this.selectedVendorsCount -= 1;
        }
        this.storeVendorsInSessionStorage(this[vendorSelectionType], storageKey);
        this.storeVendorCountInSessionStorage(this.selectedVendorsCount);
        this.vendorCountEmitter.emit(this.selectedVendorsCount);
    }

    storeVendorsInSessionStorage(selectedVendors: RfqVendors[], storageKey: string) {
        this.rfqInviteStorageService[storageKey] = selectedVendors.length > 0 ? selectedVendors : null;
    }

    storeVendorCountInSessionStorage(totalSelectedVendors: number) {
        this.rfqInviteStorageService.SelectedVendorsCount = totalSelectedVendors;
    }

    handleSelectedShebaVerifiedVendors(shebaVerifiedVendors: RfqVendors) {
        this.onSelectVendor(shebaVerifiedVendors, 'selectedVerifiedVendors', 'ShebaVerifiedSelectedVendors');
        this.storeShebaVerifiedVendors(shebaVerifiedVendors);
    }

    /* This method will store the selected verified vendors and will not remove */
    storeShebaVerifiedVendors(vendor) {
        const index = this.verifyVendors.findIndex((item) => item.id === vendor.id);
        if (index === -1) {
            this.verifyVendors.push(vendor);
            this.rfqInviteStorageService.StoredShebaVerifiedVendors = this.verifyVendors;
        }
    }

}
