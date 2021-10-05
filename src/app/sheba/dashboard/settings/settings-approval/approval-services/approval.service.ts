import { Injectable } from '@angular/core';
import { ShebaHttpService } from '../../../../../modules/sheba-http/sheba-http.service';
import { PopAlertService } from '../../../../../modules/pop-alert/pop-alert.service';
import { StorageService } from '../../../../../services/storage.service';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';
import {ApprovalListComponent} from '../approval-list/approval-list.component';

@Injectable({
    providedIn: 'root'
})

export class ApprovalService {

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService,
                private storage: StorageService) { }

    getTypeList() {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/approval-flows/types';
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }
    getApprovalFlowList() {
        let url = 'v2/businesses/' + this.storage.user.business_id + '/approval-flows';
        url += '?offset=0&limit=' + ApprovalListComponent.ITEMS_PER_PAGE;

        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    getDepartmentList() {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/departments';
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    getEmployeesList() {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/employees';
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    getApprovalFlowDetails(approvalId) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/approval-flows/' + approvalId;

        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }
}
