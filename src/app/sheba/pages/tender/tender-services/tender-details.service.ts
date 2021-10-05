import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ShebaHttpService } from '../../../../modules/sheba-http/sheba-http.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PopAlertService } from '../../../../modules/pop-alert/pop-alert.service';

@Injectable({
    providedIn: 'root'
})

// TODO: 'Must Write an Interface after receiving response for both basic and advance from API

export class TenderDetailsService implements Resolve<Observable<any>> {

    baseURL = 'v2/businesses/tenders';

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.getTenderDetails(route.params.id);
    }

    getTenderDetails(tenderId: number) {
        const url = this.baseURL + '/' + tenderId;
        const params = { token: '' };
        return this.http.get(url, { params, responseType: 'text'}).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return JSON.parse(response).tender;
        }));

    }

}


