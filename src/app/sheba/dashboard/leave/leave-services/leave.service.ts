import { Injectable } from '@angular/core';
import { ShebaHttpService } from '../../../../modules/sheba-http/sheba-http.service';
import { catchError, map } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { PopAlertService } from '../../../../modules/pop-alert/pop-alert.service';
import { StorageService } from '../../../../services/storage.service';
import { ITEMS_PER_PAGE } from '../leave-requests/leave-requests-list.constant';
import {LeaveBalanceListComponent} from '../leave-balance/leave-balance-list/leave-balance-list.component';

@Injectable({
    providedIn: 'root'
})

export class LeaveService {

    baseUrl = 'v2/businesses/' + this.storage.user.business_id + '/leaves';
    constructor(
        private http: ShebaHttpService,
        private storage: StorageService,
        private pop: PopAlertService
    ) { }

    getLeaveRequestsList() {
        const params = {
            offset: 0,
            limit: ITEMS_PER_PAGE
        };
        const url = this.baseUrl + '/approval-requests/lists';
        return this.apiCall(url, params);
    }

    getLeaveRequestedListSortedByName(sortType: string) {
        const params = {
            offset: 0,
            limit: ITEMS_PER_PAGE,
            sort: sortType
        };
        const url = this.baseUrl + '/approval-requests/lists';
        return this.apiCall(url, params);
    }

    fetchFilteredLeaveRequestsList(params) {
        const url = this.baseUrl + '/approval-requests/lists';
        return this.apiCall(url, params);
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

    getRequestDetails(requestID) {
        const url = this.baseUrl + '/approval-requests/' + requestID;
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    private apiCall(url, params?) {
        return this.http.get(url, { params, responseType: 'text' }).pipe(catchError(err => {
            this.pop.open(err.message);
            return of([]);
        })).pipe(map((response) => {
            return JSON.parse(response);
        }));
    }

    getBalanceList() {
        let url =  this.baseUrl + '/balance/lists';
        url += '?offset=0&limit=' + LeaveBalanceListComponent.ITEMS_PER_PAGE;
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    getBalanceDetails(employeeID) {
        const url =  this.baseUrl + '/balance/' + employeeID;
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    approveOrRejectLeaveRequest(data): Promise<any> {
        const url = this.baseUrl + '/approval-requests/status';
        return this.http.post(url, data).toPromise();
    }

}
