import {Injectable} from '@angular/core';
import {AttendanceService} from './attendance.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {Observable, forkJoin} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class AttendanceMonthlyListResolverService {

    constructor(private attendanceService: AttendanceService) { }

    resolve(): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return forkJoin([
            this.attendanceService.getMonthlyAttendance(),
            this.attendanceService.getDepartmentList(),
        ]).pipe(map((result) => {
            const [ { all_employee_attendance }, { departments } ] = result;
            const totalAttendancesCount = result[0].total_members;
            return { all_employee_attendance, departments, totalAttendancesCount } ;
        }));
    }

}
