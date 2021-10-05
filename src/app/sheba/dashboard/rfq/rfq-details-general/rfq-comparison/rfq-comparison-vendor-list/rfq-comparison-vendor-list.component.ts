import { Component, Input, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../../../../../../services/storage.service';
import {RfqCompareService} from '../../../rfq-services/rfq-details-services/rfq-compare.service';

@Component({
    selector: 'app-rfq-comparison-vendor-list',
    templateUrl: './rfq-comparison-vendor-list.component.html',
    styleUrls: ['./rfq-comparison-vendor-list.component.scss']
})

export class RfqComparisonVendorListComponent implements OnInit {

    @Input() bidsList;

    procurementId: any;
    vendors: any[] = [];
    compareIndexes: number[] = [];
    allBids: any[] = [];
    favoriteFilterOn = false;

    constructor(private route: ActivatedRoute,
                private rfqCompareService: RfqCompareService,
                private storage: StorageService) {
        this.procurementId = route.snapshot.parent.params.id;
        this.setupCompareIndexes();
    }

    ngOnInit() {
        this.allBids = this.vendors = this.bidsList.map(bid => {
            return {
                id: bid.id,
                name: bid.bidder_name,
                logo: bid.bidder_logo,
                rating: bid.bidder_avg_rating,
                is_favourite: bid.is_favourite,
                created_at: bid.created_at,
                status: bid.status,
                verificationStatus: bid.bidder_status
            };
        });
    }

    setupCompareIndexes() {
        this.storage.ProcurementBidCompareIndexes = [0, 1, 2];
        this.compareIndexes = this.storage.ProcurementBidCompareIndexes;
        this.storage.procurementBidCompareIndexesWatcher.asObservable().subscribe((res) => {
            this.compareIndexes = this.storage.ProcurementBidCompareIndexes;
        });
    }

    filterFavorites() {
        this.favoriteFilterOn = !this.favoriteFilterOn;
        this.rfqCompareService.filterChange(this.favoriteFilterOn);
        this.vendors = this.favoriteFilterOn ? this.allBids.filter(bid => bid.is_favourite) : this.allBids;
    }

}
