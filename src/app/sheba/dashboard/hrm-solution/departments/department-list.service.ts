import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class DepartmentListService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getEmployees();
    }

    getEmployees() {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/departments?offset=0&limit=10').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.departments;
        }));
    }
}


