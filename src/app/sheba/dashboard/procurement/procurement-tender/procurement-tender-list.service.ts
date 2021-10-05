import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProcurementTenderListService implements Resolve<Observable<any>> {

    constructor(private http: ShebaHttpService, private storage: StorageService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getProcurementTenderList();
    }

    getProcurementTenderList() {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/procurements?offset=0&limit=10').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res;
        }));
    }
}
