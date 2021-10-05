import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../../modules/sheba-http/sheba-http.service';
import {catchError, map} from 'rxjs/operators';
import {StorageService} from '../../../../../services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class VehicleDetailsAssignmentService implements Resolve<Observable<any>> {

    constructor(
        private http: ShebaHttpService,
        private storage: StorageService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return this.getVehicleRegistrationInfo(route.parent.params.vehicle_id);
    }

    getVehicleRegistrationInfo(id) {
        return this.http.get('v2/members/' + this.storage.user.member_id + '/vehicles/' + id + '/recent-assignment').pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res.recent_assignment;
        }));
    }
}

