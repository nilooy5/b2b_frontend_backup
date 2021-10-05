import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class DriverContactService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getDriverContactInfo(route.parent.params.driver_id);
    }

    getDriverContactInfo(id) {
        return this.http.get('v2/members/' + this.storage.user.member_id + '/drivers/' + id + '/contract-info').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.contract_info;
        }));
    }
}

