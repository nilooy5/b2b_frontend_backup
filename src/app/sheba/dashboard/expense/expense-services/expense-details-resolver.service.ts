import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ExpenseService } from './expense.service';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class ExpenseDetailsResolverService {

    constructor(private expenseService: ExpenseService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        const memberId = route.queryParams.member;
        const month = route.queryParams.month;
        return forkJoin([
            this.expenseService.getExpenseDetails(memberId, month),
            this.expenseService.getEmployeeDetails(memberId)
        ]).pipe(map((result) => {
            const [ { expenses }, { employee } ] = result;
            const totalExpensesSum = result[0].total_expenses_sum;
            return { expenses, employee, totalExpensesSum };
        }));
    }

}
