import { Injectable } from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Resolve} from '@angular/router';
import {ExpenseService} from './expense.service';

@Injectable({
    providedIn: 'root'
})

export class ExpenseListResolverService implements Resolve<Observable<any>> {

    constructor(private expenseService: ExpenseService) { }

    resolve(): Observable<Observable<any>> | Promise<Observable<any>> | Observable<any> {
        return forkJoin([
            this.expenseService.getExpenseList(),
            this.expenseService.getDepartmentList(),
            this.expenseService.getEmployeesList()
        ]).pipe(map((result) => {
            const [ { expenses  }, { departments }, { employees } ] = result;
            const totalExpensesCount = result[0].total_expenses_count;
            return { expenses, departments, employees, totalExpensesCount };
        }));
    }

}
