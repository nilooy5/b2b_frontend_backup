import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {listFilters} from "../helpers/functions";
import {ShebaHttpService} from "../modules/sheba-http/sheba-http.service";
import {StorageService} from "./storage.service";
import {catchError, map} from "rxjs/operators";
import {Vendor} from '../types/vendors';

@Injectable({
    providedIn: 'root'
})
export class VendorService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        if (route.params.vendor_id) {
            return this.loadVendor(route.params.vendor_id);
        } else {
            return this.loadVendors();
        }
    }

    loadVendors(page?: number, limit?: number, filter?: any) {
        const filterString = listFilters(page, limit, filter);
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/vendors' + filterString).pipe(catchError(err => {
                return of(
                    {code: 404, vendors: []}
                );
            }),
            map(res => {
                return res.code === 200 ? res.vendors : [];
            })
        );
    }

    loadVendor(id: string) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/vendors/' + id + '/info').pipe(map(res => {
            return res.code === 200 ? res.vendor : null;
        }));
    }

    inviteVendors(data) {
        return this.http.post('v2/businesses/' + this.storage.user.business_id + '/invite', data);
    }
}
