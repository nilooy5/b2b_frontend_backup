import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {RfqVendors} from '../../../../../../../types/rfq';
import {RfqInviteStorageService} from '../../../../../../../services/rfq-invite-storage-service/rfq-invite-storage.service';

@Component({
    selector: 'app-no-vendor-found',
    templateUrl: './no-vendor-found.component.html',
    styleUrls: ['./no-vendor-found.component.scss']
})

export class NoVendorFoundComponent implements OnInit, OnChanges {

    @Input() notFoundType: string;
    @Input() verifiedVendors: RfqVendors[];
    @Input() selectedVerifiedVendors: RfqVendors[] = [];
    @Output() shebaVerifiedVendorsEmitter: EventEmitter<RfqVendors> = new EventEmitter<RfqVendors>();

    baseImageUrl = '../../../../../../../../assets/svg/';

    notFoundMessage = {
        hasVendorInBusinessesList: 'You need to add vendors first to invite them to participate and submit their proposals to your Tender.\n' +
            '     They will be notified and get link through SMS and email once you invite them.',
        noVendorButHasShebaVerified: 'Sorry! No vendor found with this number but there is a verified vendor in Sheba.xyz platform.\n' +
            '    You can select this vendor and send invitation to participate.',
        noVendorButOthersSelected: 'No vendor found with this number in your list.\n' +
            '   Add vendors you want to invite from vendor module. & then invite them from your tender details.',
        noVendorFound: 'Sorry! No vendors found with this number.\n' +
            '    Send invitation to your favorite vendors from vendor module and to participate in Tender invite them from Tender details.',

    };

    notFound: { img: string; title: string, showAddNewButton: boolean, showVerifiedVendorsList: boolean };

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.notFoundType && changes.notFoundType.currentValue) {
            this.setImageAndMessage(changes.notFoundType.currentValue);
        }
    }

    ngOnInit() { }

    setImageAndMessage(notFoundType: string) {
        if (notFoundType === 'hasVendorInBusinessesList') {
            this.constructNotFound('vendor.svg', this.notFoundMessage.hasVendorInBusinessesList, true, false);
        }

        if (notFoundType === 'noVendorButHasShebaVerified') {
            this.constructNotFound('vendor-search.svg', this.notFoundMessage.noVendorButHasShebaVerified, false, true);
        }

        if (notFoundType === 'noVendorButOthersSelected') {
            this.constructNotFound('vendor-search.svg', this.notFoundMessage.noVendorButOthersSelected, false, false);
        }

        if (notFoundType === 'noVendorFound') {
            this.constructNotFound('vendor-search.svg', this.notFoundMessage.noVendorFound, true, false);
        }
    }

    constructNotFound(image: string, message: string, showButton: boolean, showVerifiedVendors: boolean) {
        this.notFound = {
            img: this.baseImageUrl + image,
            title: message,
            showAddNewButton: showButton,
            showVerifiedVendorsList: showVerifiedVendors,
        };
    }

    onSelectVerifiedVendor(vendor: RfqVendors) {
        this.shebaVerifiedVendorsEmitter.emit(vendor);
    }


}
