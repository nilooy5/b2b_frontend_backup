import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StorageService} from '../../../../../../../services/storage.service';
import {Router} from '@angular/router';
import {ProcurementBidsService} from '../../procurement-bids.service';
import {PopAlertService} from '../../../../../../../modules/pop-alert/pop-alert.service';

@Component({
    selector: 'app-procurement-tender-bid-vendor-card',
    templateUrl: './procurement-tender-bid-vendor-card.component.html',
    styleUrls: ['./procurement-tender-bid-vendor-card.component.scss']
})
export class ProcurementTenderBidVendorCardComponent implements OnInit {
    @Input() vendor: any;
    @Input() procurementID: any;
    @Input() minimal: boolean = false;
    @Input() index: number;
    @Input() visibleIndexes: number[] = [];
    @Output() favoriteChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() visibilityChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    isFavorite: boolean;
    isVisible: boolean;
    compareIndexes: any[] = [];

    constructor(
        private storage: StorageService,
        private router: Router,
        private procurementBidService: ProcurementBidsService,
        private pop: PopAlertService
    ) {
        this.compareIndexes = this.storage.ProcurementBidCompareIndexes;
    }

    ngOnInit() {
        this.isFavorite = this.vendor.is_favourite;
        this.isVisible = false;

        this.storage.procurementBidCompareIndexesWatcher.asObservable().subscribe((res) => {
            // tslint:disable-next-line:triple-equals
            this.isVisible = this.visibleIndexes.findIndex(i => i == this.index) !== -1;
        });
    }

    limitString(str) {
        const limit = this.minimal ? 17 : 22;
        return (str && str.length > limit) ? str.slice(0, limit - 2) + '..' : str;
    }

    redirectToBidDetails() {
        this.router.navigate(['/', 'dashboard', 'procurement', this.procurementID, 'quotation'], { queryParams: {id: this.vendor.id}}).catch(err => {
            console.log(err);
        });
    }

    redirectToBidMessaging() {
        this.router.navigate(['/', 'dashboard', 'procurement', this.procurementID, 'messaging'], { queryParams: {id: this.vendor.id}}).catch(err => {
            console.log(err);
        });
    }

    favorite() {
        this.procurementBidService.postFavorite(this.vendor.id, !this.isFavorite).then(res => {
            this.isFavorite = !this.isFavorite;
            this.procurementBidService.refreshTable();
        }).catch(err => {
            this.pop.open(err);
        });
    }

    changeVisibility() {
        const isIndexed =  this.storage.ProcurementBidCompareIndexes.findIndex(i => i == this.index);
        if (isIndexed === -1) {
            this.compareIndexes.push(this.index);
        } else {
            this.compareIndexes.splice(isIndexed, 1);
        }
        this.storage.ProcurementBidCompareIndexes = this.compareIndexes;
        // this.isVisible = !this.isVisible;
        this.visibilityChange.emit(this.isVisible);
    }
}
