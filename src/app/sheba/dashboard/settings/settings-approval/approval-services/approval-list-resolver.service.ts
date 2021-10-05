import { Injectable } from '@angular/core';
import {ApprovalService} from './approval.service';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ApprovalListResolverService {

    constructor(private approvalService: ApprovalService) { }

    resolve(): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return forkJoin([
            this.approvalService.getTypeList(),
            this.approvalService.getApprovalFlowList(),
            this.approvalService.getDepartmentList()
        ]).pipe(map((result) => {
            const [ { types }, { approval, total_approvals_flow }, { departments } ] = result;
            const totalApprovalsFlowCount = total_approvals_flow;
            return { types, approval, departments, totalApprovalsFlowCount };
        }));
    }
}
