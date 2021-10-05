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
export class FleetIssueListService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getIssues();
    }

    getIssues() {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/issues?offset=0&limit=10').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.issue_lists;
        }));
    }
}
