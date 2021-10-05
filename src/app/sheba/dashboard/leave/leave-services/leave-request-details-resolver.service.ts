import {Injectable} from '@angular/core';
import {LeaveService} from './leave.service';
import {forkJoin, Observable} from 'rxjs';
import {ActivatedRouteSnapshot} from '@angular/router';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class LeaveRequestDetailsResolverService {

    constructor(private leaveService: LeaveService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        const requestID = route.params.id;
        return forkJoin([
            this.leaveService.getRequestDetails(requestID)
        ]).pipe(map((result) => {
            const [{ approval_details }] = result;
            return { approval_details };
        }));
    }
}
