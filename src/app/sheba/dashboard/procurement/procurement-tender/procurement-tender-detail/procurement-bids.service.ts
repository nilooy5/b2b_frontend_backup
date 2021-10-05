import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProcurementBidsService {
    favoriteFilterOn = false;

    public procurementBidRefreshEmitter: BehaviorSubject<any> = new BehaviorSubject(false);
    public procurementBidFilterEmitter: BehaviorSubject<any> = new BehaviorSubject(false);

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    fetchAllBids(procurementId) {
        return new Promise((resolve, reject) => {
            this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + procurementId + '/bids').toPromise().then(response => {
                if (response.code === 200) {
                    resolve(response.bid_lists);
                } else {
                    reject(response.message);
                }
            }).catch(error => {
                reject(error.message);
            });
        });
    }

    postFavorite(bidId, isFavorite) {
        return new Promise((resolve, reject) => {
            this.http.post('v2/businesses/' + this.storage.user.business_id + '/bids/' + bidId , {
                is_favourite: isFavorite ? 1 : 0
            }).toPromise().then(response => {
                response.code === 200 ? resolve(response) : reject(response.message);
            }).catch(error => {
                reject(error.message);
            });
        });
    }

    refreshTable() {
        this.procurementBidRefreshEmitter.next(true);
    }

    filterChange(value) {
        this.favoriteFilterOn = value;
        this.procurementBidFilterEmitter.next(value);
    }
}
