import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RfqOrderBillPaymentsService {

  constructor(private http: ShebaHttpService,
              private storage: StorageService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        const rfqId = route.parent.params.id;
        const bidId = route.queryParamMap.get('bidId');
        return this.getAdvancePaymentRequestsList(rfqId, bidId);
    }

    getAdvancePaymentRequestsList(rfqId, bidId) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + rfqId + '/bids/' + bidId + '/payment-requests').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.payment_request_list;
        }));
    }
}
