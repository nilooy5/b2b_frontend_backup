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
export class FleetFuelDetailsService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getFuelHistory(route.params.fuel_id);
    }

    getFuelHistory(id) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/fuel-logs/' + id).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.fuel_logs;
        }));
    }
}

