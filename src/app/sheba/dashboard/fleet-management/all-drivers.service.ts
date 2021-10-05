import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AllDriversService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getVehicles();
    }

    getVehicles() {
        return this.http.get('v2/members/' + this.storage.user.member_id + '/drivers').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.driver_lists;
        }));
    }
}

