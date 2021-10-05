import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TripApprovalListService implements Resolve <Observable <any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getTripApprovalList();
    }

    getTripApprovalList() {
        return this.http.get('v2/members/' + this.storage.user.member_id + '/trip-request-approval?limit=10&offset=0')
            .pipe(catchError(err => {
            return of([]);
        }))
            .pipe(map(res => {
                return res.request_approvals;
            }));
    }
}

