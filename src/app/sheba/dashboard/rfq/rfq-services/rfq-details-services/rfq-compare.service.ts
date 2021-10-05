import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {StorageService} from '../../../../../services/storage.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class RfqCompareService {

    favoriteFilterOn = false;

    public procurementBidRefreshEmitter: BehaviorSubject<any> = new BehaviorSubject(false);
    public procurementBidFilterEmitter: BehaviorSubject<any> = new BehaviorSubject(false);

    baseUrl: string;

    constructor(private http: ShebaHttpService,
                private router: Router,
                private storage: StorageService,
                private pop: PopAlertService) {
        this.baseUrl = `v2/businesses/${storage.user.business_id}`;
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.getRfqBidsDetails(route.parent.params.id);
    }

    getRfqBidsDetails(rfqId: string) {
        const url = `${this.baseUrl}/procurements/${rfqId}/bids`;
        return this.getApiCall(url);
    }

    popErrorMessage(message: string) {
        this.pop.open(message);
    }

    private getApiCall(url, params?) {
        return this.http.get(url, { params, responseType: 'text' }).pipe(catchError(err => {
            this.popErrorMessage(err.message);
            return of([]);
        })).pipe(map((response => {
            return JSON.parse(response).code === 200 ? JSON.parse(response).bid_lists : [];
        })));
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
