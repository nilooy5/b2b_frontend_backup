import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';
import {PopAlertService} from '../../../../modules/pop-alert/pop-alert.service';
import {catchError, map} from 'rxjs/operators';
import { AttendanceMonthlyListComponent } from '../attendance-monthly/attendance-monthly-list/attendance-monthly-list.component';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {MonthPickerComponent} from 'ngx-bootstrap';

@Injectable({
    providedIn: 'root'
})

export class AttendanceService {
    constructor(
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService
    ) {}
    getDepartmentList() {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/departments';
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    getMonthlyAttendance() {
        let url = 'v2/businesses/' + this.storage.user.business_id + '/attendances/monthly';
        url += '?offset=0&limit=' + AttendanceMonthlyListComponent.ITEMS_PER_PAGE;

        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    getDailyAttendance({date}) {
        return this.http.get('v2/businesses/' + this.storage.user.business_id + '/attendances/daily?date=' + date).pipe(catchError(err => {
            return of([]);
        })).pipe(map(res => {
            return res;
        }));
    }

    getEmployeeAttendanceDetails(memberId, month) {
        let url = 'v2/businesses/' + this.storage.user.business_id + '/members/' + memberId + '/attendances';
        url += '?month=' + month;

        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }
}
