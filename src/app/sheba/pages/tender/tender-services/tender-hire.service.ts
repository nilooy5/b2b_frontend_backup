import { Injectable } from '@angular/core';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class TenderHireService {

    baseURL = 'v2/businesses/tenders/';

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        const tenderId = route.params.id;
        const bidId = route.params.bid_id;
        return this.getTenderHireDetails(tenderId, bidId);
    }

    getTenderHireDetails(tenderId: string, bidId: string) {
        const url = this.baseURL + tenderId + '/proposal/' + bidId;
        const params = { token: '' };
        return this.http.get(url, { params, responseType: 'text' }).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return JSON.parse(response);
        }));
    }
}
