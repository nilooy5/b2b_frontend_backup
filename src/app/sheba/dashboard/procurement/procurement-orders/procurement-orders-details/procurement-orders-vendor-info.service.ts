import { Injectable } from '@angular/core';
import { ShebaHttpService } from '../../../../../modules/sheba-http/sheba-http.service';
import { StorageService } from '../../../../../services/storage.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProcurementOrdersVendorInfoService {

    constructor(private http: ShebaHttpService,
                private storage: StorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        const procurementId = route.parent.parent.params.order_id;
        const bidId = route.queryParamMap.get('bid');
        return this.getVendorInformation(procurementId, bidId);
    }

    getVendorInformation(procurementId, bidId) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + procurementId + '/bids/' + bidId).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.order_details.vendor;
        }));
    }
}
