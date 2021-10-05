import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { StorageService } from '../../../../services/storage.service';
import { PopAlertService } from '../../../../modules/pop-alert/pop-alert.service';
import { ShebaHttpService } from '../../../../modules/sheba-http/sheba-http.service';
import {SupportListComponent} from '../../support/support-list/support-list.component';
import {getErrorMessage} from '../../../../helpers/functions';
import {ExpenseListComponent} from '../expense-list/expense-list.component';

@Injectable({
    providedIn: 'root'
})

export class ExpenseService {

    constructor(private http: ShebaHttpService,
                private pop: PopAlertService,
                private storage: StorageService) { }

    getExpenseList() {
        let url = 'v2/businesses/' + this.storage.user.business_id + '/expense';
        url += '?offset=0&limit=' + ExpenseListComponent.ITEMS_PER_PAGE;

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

    getExpenseDetails(memberId, month) {
        // v2/businesses/11/expense/filter-month?month=1&member_id=420
        let url = 'v2/businesses/' + this.storage.user.business_id + '/expense/filter-month';
        url += '?member_id=' + memberId + '&month=' + month;
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ([]);
        }));
    }

    getEmployeeDetails(memberId) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/employees/' + memberId;
        return this.http.get(url).pipe(catchError(err => {
            this.pop.open(err.message);
            return of ({});
        }));
    }

    postEditedExpenseAmount(expenseId, expenseAmount) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/expense/' + expenseId;
        return this.http.post(url, { amount: expenseAmount});
    }

    getFilteredExpenses(filters) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/expense';
        return this.http.get(url, { params: filters,  responseType: 'text' });
    }

}
