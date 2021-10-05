import {Injectable} from '@angular/core';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RfqOrderDetailsService {

    constructor(private http: ShebaHttpService,
                private storage: StorageService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        const bidId = route.queryParamMap.get('bidId');
        let rfqId;
        rfqId = route.params.id ? route.params.id : route.parent.params.id;
        return this.getRfqOrdersDetails(rfqId, bidId);
    }

    getRfqOrdersDetails(rfqId, bidId) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + rfqId + '/bids/' + bidId).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.order_details;
        }));
    }
}
