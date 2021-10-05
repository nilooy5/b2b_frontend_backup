import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class VendorSpocInfoService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        console.log(route.parent.params.vendor_id);
        return this.getVendorSpocInfo(route.parent.params.vendor_id);
    }

    getVendorSpocInfo(id) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/vendors/' + id + '/resource-info').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.vendor;
        }));
    }
}


