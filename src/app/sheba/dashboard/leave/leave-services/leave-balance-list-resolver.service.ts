import {Injectable} from '@angular/core';
import {LeaveService} from './leave.service';
import {forkJoin, Observable} from 'rxjs';
import {ActivatedRouteSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LeaveBalanceListResolverService {

    constructor(private leaveService: LeaveService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return forkJoin([
            this.leaveService.getBalanceList(),
            this.leaveService.getDepartmentList(),
            this.leaveService.getEmployeesList()
        ]).pipe(map((result) => {
            const [{ leave_balances, total_records, leave_types }, { departments }, { employees } ] = result;
            return {leave_balances, total_records, leave_types, departments, employees};
        }));
    }
}
