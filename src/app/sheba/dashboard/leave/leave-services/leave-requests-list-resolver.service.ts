import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { LeaveService} from './leave.service';
import { LeaveRequestsModule } from '../leave-requests/leave-requests.module';

@Injectable({
  providedIn: LeaveRequestsModule
})

export class LeaveRequestsListResolverService implements Resolve<any> {

    constructor(private leaveService: LeaveService) { }

    resolve(): Observable<any> | Promise <any> | any {
        return forkJoin([
            this.leaveService.getLeaveRequestsList(),
            this.leaveService.getDepartmentList(),
            this.leaveService.getEmployeesList()
        ]).pipe(map((result) => {
            const [ { leaves }, { departments }, { employees } ] = result;
            const totalLeaveRequestsCount = result[0].total_leave_requests;
            return { leaves, departments, employees, totalLeaveRequestsCount };
        }));
    }

}
