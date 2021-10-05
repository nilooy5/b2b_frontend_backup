import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../services/storage.service';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {RfqVendors} from '../../../../../types/rfq';

@Injectable({
    providedIn: 'root'
})

export class RfqInviteService implements Resolve<RfqVendors[]> {

    constructor(private http: ShebaHttpService,
                private router: Router,
                private storage: StorageService,
                private pop: PopAlertService) {}

    resolve(): Observable<RfqVendors[]> {
        return this.getVendorsList();
    }

    getVendorsList(params?) {
        const url = `v3/businesses/${this.storage.user.business_id}/vendors`;

        return this.http.get(url, { params, responseType: 'text'}).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return JSON.parse(response);
        }));
    }

    postInvitedVendors(tenderId: number, vendors: { partners: string }): Observable<any> {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/procurements/' + tenderId + '/invitations';
        return this.http.post(url, vendors);
    }

}
