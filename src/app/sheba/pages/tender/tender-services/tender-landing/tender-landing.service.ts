import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ShebaHttpService } from '../../../../../modules/sheba-http/sheba-http.service';
import { PopAlertService } from '../../../../../modules/pop-alert/pop-alert.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class TenderLandingService implements Resolve<any> {

    baseURL = 'v2/businesses/tenders';

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.getsLandingInfo();
    }

    getsLandingInfo() {
        const url = this.baseURL + '/landings';
        const params = { token: '' };
        return this.http.get(url, {params, responseType: 'text'}).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return JSON.parse(response);
        }));
    }


}
