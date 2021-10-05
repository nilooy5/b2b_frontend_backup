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
export class InspectionFormsService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getInspections();
    }

    getInspections() {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/inspections/forms').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.form_lists;
        }));
    }
}

