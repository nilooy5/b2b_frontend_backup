import {Injectable} from '@angular/core';
import {AttendanceService} from './attendance.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AttendanceDetailsResolverService {

    constructor(private attendanceService: AttendanceService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        const memberId = route.params.id;
        const month = route.queryParams.month;
        return forkJoin([
            this.attendanceService.getEmployeeAttendanceDetails(memberId, month)
        ]).pipe(map((result) => {
            const [{ stat, attendances, employee }] = result;
            return { stat, attendances, employee };
        }));
    }

}
