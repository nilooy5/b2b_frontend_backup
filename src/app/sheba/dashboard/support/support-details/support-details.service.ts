import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupportDetailsService {

    constructor(private http: ShebaHttpService,
                private storage: StorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getSupportDetails(route.params.support_id);
    }

    getSupportDetails(supportId) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/supports/' + supportId).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.support;
        }));
    }
}
