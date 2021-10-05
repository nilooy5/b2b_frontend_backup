import { Injectable } from '@angular/core';
import { ApprovalService } from './approval.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ApprovalDetailsResolverService {

    constructor(private approvalService: ApprovalService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return forkJoin([
            this.approvalService.getTypeList(),
            this.approvalService.getDepartmentList(),
            this.approvalService.getEmployeesList(),
            this.approvalService.getApprovalFlowDetails(route.params.approval_id)
        ]).pipe(map((result) => {
            const [ {types}, { departments }, { employees }, { approval_flow_details } ] = result;
            return { types, departments, employees, approval_flow_details };
        }));
    }
}
