import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProcurementBidsService} from '../../procurement-bids.service';
import {StorageService} from '../../../../../../../services/storage.service';

@Component({
    selector: 'app-procurement-tender-detail-bid-tab',
    templateUrl: './procurement-tender-detail-bid-tab.component.html',
    styleUrls: ['./procurement-tender-detail-bid-tab.component.scss']
})

export class ProcurementTenderDetailBidTabComponent implements OnInit {

    procurementId: any;
    vendors: any[] = [];
    compareIndexes: number[] = [];
    allBids: any[] = [];
    favoriteFilterOn = false;

    constructor(
        private route: ActivatedRoute,
        private procurementBidsService: ProcurementBidsService,
        private storage: StorageService
    ) {
        this.procurementId = this.route.snapshot.params.procurement_id;
        this.setupCompareIndexes();
        this.route.data.subscribe(res => {
            // @ts-ignore
            this.allBids = this.vendors = res.bids.map(bid => {
                return {
                    id: bid.id,
                    name: bid.bidder_name,
                    logo: bid.bidder_logo,
                    rating: bid.bidder_avg_rating,
                    is_favourite: bid.is_favourite,
                    created_at: bid.created_at,
                    status: bid.status,
                };
            });
        });
    }

    ngOnInit() {
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
        this.procurementBidsService.filterChange(this.favoriteFilterOn);
        this.vendors = this.favoriteFilterOn ? this.allBids.filter(bid => bid.is_favourite) : this.allBids;
    }
}
