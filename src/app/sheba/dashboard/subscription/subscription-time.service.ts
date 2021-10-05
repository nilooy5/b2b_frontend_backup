import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ShebaHttpService} from '../../../modules/sheba-http/sheba-http.service';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionTimeService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getTimes();
    }

    getTimes() {
        return this.http.get('/v2/times').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res;
        }));
    }
}
