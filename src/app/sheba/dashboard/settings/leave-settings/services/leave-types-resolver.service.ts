import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { LeaveType } from '../types/leave-type';
import { Observable, of } from 'rxjs';
import { ShebaHttpService } from '../../../../../modules/sheba-http/sheba-http.service';
import { StorageService } from '../../../../../services/storage.service';
import { catchError, map } from 'rxjs/operators';
import {PopAlertService} from '../../../../../modules/pop-alert/pop-alert.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypesResolverService implements Resolve<LeaveType[]> {

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService,
                private storage: StorageService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LeaveType[]> | Promise<LeaveType[]> | LeaveType[] {
        return this.getLeaveTypesList();
    }


    getLeaveTypesList(): Observable<LeaveType[]> {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/leaves/settings';
        return this.http.get(url).pipe(catchError((err) => {
            return of ([]);
        })).pipe(map((response) => {
            return response.leave_types;
        }));
    }

    createLeaveType(leaveTypeData) {
        const data = {
            title: leaveTypeData.typeName,
            total_days: leaveTypeData.totalDays
        };
        const url = 'v2/businesses/' + this.storage.user.business_id + '/leaves/settings';
        return this.http.post(url, data);
    }

    updateLeaveType(leaveTypeData) {
        const data = {
            title: leaveTypeData.typeName,
            total_days: leaveTypeData.totalDays
        };
        const url = 'v2/businesses/' + this.storage.user.business_id + '/leaves/settings/' + leaveTypeData.id + '/update';
        return this.http.post(url, data);
    }

    deleteLeaveType(leaveTypeId) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/leaves/settings/' + leaveTypeId + '/delete';
        return this.http.delete(url);
    }

    getLeaveTypes() {
       return this.http.get('v2/businesses/' + this.storage.user.business_id + '/leaves/settings');
    }
}
