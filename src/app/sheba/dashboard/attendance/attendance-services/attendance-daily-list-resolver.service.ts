import {Injectable} from '@angular/core';
import {AttendanceService} from './attendance.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {forkJoin, Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})

export class AttendanceDailyListResolverService {

    constructor(private attendanceService: AttendanceService) { }

    resolve(): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        const today: any = moment().format('YYYY-MM-DD');
        return forkJoin([
            this.attendanceService.getDailyAttendance({date: today}),
            this.attendanceService.getDepartmentList(),
        ]).pipe(map((result) => {
            const [ { attendances }, { departments }] = result;
            const totalAttendancesCount = result[0].total;
            return { attendances, departments, totalAttendancesCount };
        }));
    }
}
