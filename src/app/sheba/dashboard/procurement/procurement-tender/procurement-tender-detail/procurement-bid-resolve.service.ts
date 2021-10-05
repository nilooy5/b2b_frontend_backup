import { Injectable } from '@angular/core';

import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class ProcurementBidResolveService {

    procurementId: any;
    constructor(
        private http: ShebaHttpService,
        private router: Router,
        private storage: StorageService,
        private pop: PopAlertService
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        this.procurementId = route.paramMap.get('procurement_id');
        return this.getProcurementBids();
    }

    getProcurementBids(id?) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementId + '/bids').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            if (res.code === 200) {
                return res.bid_lists;
            } else {
                return [];
            }
        }));
    }

}
