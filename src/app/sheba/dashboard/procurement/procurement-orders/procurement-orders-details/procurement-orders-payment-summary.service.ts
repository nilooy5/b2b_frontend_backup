import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProcurementOrdersPaymentSummaryService implements Resolve<Observable<any>> {

    constructor(private http: ShebaHttpService,
                private storage: StorageService) { }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        const procurementId = route.parent.parent.params.order_id;
        return this.getPaymentSummary(procurementId);
    }

    getPaymentSummary(procurementId) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + procurementId + '/bill').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.rfq_order_bill;
        }));
    }
}
