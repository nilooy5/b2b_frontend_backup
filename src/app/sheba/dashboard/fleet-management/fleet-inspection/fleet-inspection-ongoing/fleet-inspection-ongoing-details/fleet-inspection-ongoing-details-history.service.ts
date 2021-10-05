import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../../../services/storage.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FleetInspectionOngoingDetailsHistoryService implements Resolve <Observable <any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getInspectionScheduleList(route.parent.params.inspection_id);
    }

    getInspectionScheduleList(id) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/inspections/' + id + '/list?filter=history&offset=0&limit=10').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.inspections;
        }));
    }
}

