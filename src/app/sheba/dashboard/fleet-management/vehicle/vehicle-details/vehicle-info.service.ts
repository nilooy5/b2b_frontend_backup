import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class VehicleInfoService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getVehicleInfo(route.params.vehicle_id || route.parent.params.vehicle_id);
    }

    getVehicleInfo(id) {
        return this.http.get('v2/members/' + this.storage.user.member_id + '/vehicles/' + id + '/general-info').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.general_info;
        }));
    }
}

@Injectable({
    providedIn: 'root'
})
export class VehicleHandlerFetchService implements Resolve<Observable<any>> {
    defaultResponse = {
        driver: null,
        vendor: null
    };

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getVehicleHandlers(route.params.vehicle_id || route.parent.params.vehicle_id);
    }

    getVehicleHandlers(id: string) {
        return this.http.get('v2/members/' + this.storage.user.member_id + '/vehicles/' + id + '/handlers').pipe(catchError(err => of(this.defaultResponse)), map(res => res.code == 200 ? res.handler : this.defaultResponse));
    }

}
