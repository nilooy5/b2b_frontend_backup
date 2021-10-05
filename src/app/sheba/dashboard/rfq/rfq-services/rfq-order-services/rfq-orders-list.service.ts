import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RfqOrdersListService {

    constructor(private http: ShebaHttpService,
                private storage: StorageService) {
    }

    resolve(): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getProcurementOrdersList();
    }

    getProcurementOrdersList() {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements/orders?offset=0&limit=10').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res;
        }));
    }
}
