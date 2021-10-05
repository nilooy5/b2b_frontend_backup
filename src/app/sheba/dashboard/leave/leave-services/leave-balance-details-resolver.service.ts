import {Injectable} from '@angular/core';
import {LeaveService} from './leave.service';
import {ActivatedRouteSnapshot} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LeaveBalanceDetailsResolverService {

    constructor(private leaveService: LeaveService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        const employeeID = route.params.id;
        return forkJoin([
            this.leaveService.getBalanceDetails(employeeID)
        ]).pipe(map((result) => {
            const [{leave_balance_details}] = result;
            return {leave_balance_details};
        }));
    }
}
