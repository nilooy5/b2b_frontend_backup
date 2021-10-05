import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ShebaHttpService } from '../../../../../modules/sheba-http/sheba-http.service';
import { StorageService } from '../../../../../services/storage.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ProcurementOrdersDetailsService implements Resolve<Observable<any>> {

    constructor(private http: ShebaHttpService,
                private storage: StorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        const procurementId = route.params.order_id;
        const bidId = route.queryParamMap.get('bid');
        return this.getProcurementOrdersDetails(procurementId, bidId);
    }

    getProcurementOrdersDetails(procurementId, bidId) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + procurementId + '/bids/' + bidId).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.order_details;
        }));
    }
}
