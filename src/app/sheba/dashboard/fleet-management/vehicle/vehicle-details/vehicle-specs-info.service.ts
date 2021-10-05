import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class VehicleSpecsInfoService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getVehicleSpecsInfo(route.parent.params.vehicle_id);
    }

    getVehicleSpecsInfo(id) {
        return this.http.get('v2/members/' + this.storage.user.member_id + '/vehicles/' + id + '/specs').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.specs_info;
        }));
    }
}

