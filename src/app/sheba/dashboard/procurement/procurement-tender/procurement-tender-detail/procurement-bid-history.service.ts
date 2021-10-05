import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcurementBidHistoryService {

    procurementId: any;

    constructor(private http: ShebaHttpService, private storage: StorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        this.procurementId = route.parent.parent.params.procurement_id;
        return this.getBidHistory();
    }

    getBidHistory() {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/' + this.procurementId + '/bid-history').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res;
        }));
    }

}
