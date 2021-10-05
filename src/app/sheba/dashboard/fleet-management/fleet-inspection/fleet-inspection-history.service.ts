import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../../services/storage.service';
import {isUndefined} from 'util';

@Injectable({
    providedIn: 'root'
})
export class FleetInspectionHistoryService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getInspections();
    }

    getInspections() {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/inspections?offset=0&limit=10').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return {
                inspections: res.inspection_lists,
                info: {
                    over_due: res.over_due,
                    item_failure_rate: res.item_failure_rate,
                    item_failure_rate_change: res.item_failure_rate_change,
                    is_rate_change_upwords: res.is_rate_change_upwords,
                }
            };
        }));
    }
}
