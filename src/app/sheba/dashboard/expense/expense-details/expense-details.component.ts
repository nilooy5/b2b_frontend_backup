import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExpenseService} from '../expense-services/expense.service';
import { IEmployee } from '../../../../types/users';
import { IExpense } from '../../../../types/expense';
import * as moment from 'moment';
import { StorageService } from '../../../../services/storage.service';
import { ShebaHttpService } from '../../../../modules/sheba-http/sheba-http.service';

@Component({
    selector: 'app-expense-details',
    templateUrl: './expense-details.component.html',
    styleUrls: ['./expense-details.component.scss']
})

export class ExpenseDetailsComponent implements OnInit {

    currentMonthSelected;
    selectedMonth;
    memberId;
    month: string;
    totalExpensesSum: number;
    employeeDetails: IEmployee;
    expenseList: IExpense[];

    months: any = [
        { key: 'january', title: 'January' },
        { key: 'february', title: 'February' },
        { key: 'march', title: 'March' },
        { key: 'april', title: 'April' },
        { key: 'may', title: 'May' },
        { key: 'june', title: 'June' },
        { key: 'july', title: 'July' },
        { key: 'august', title: 'August' },
        { key: 'september', title: 'September' },
        { key: 'october', title: 'October' },
        { key: 'november', title: 'November' },
        { key: 'december', title: 'December' }
    ];

    constructor(private activatedRoute: ActivatedRoute,
                private storage: StorageService,
                private http: ShebaHttpService) {
        this.activatedRoute.data.subscribe(({ expenseDetailsResolver }) => {
            const { expenses, employee, totalExpensesSum } = expenseDetailsResolver;
            this.setExpenseList(expenses);
            this.setEmployeeDetails(employee);
            this.totalExpensesSum = totalExpensesSum;
        });

        this.activatedRoute.queryParams.subscribe(({ member, month }) => {
            this.memberId = member;
            this.currentMonthSelected = moment(month, 'M').format('MMMM').toLowerCase();
        });

        // this.currentMonthSelected = moment().startOf('month').format('MMMM').toLowerCase();

        const check = moment(this.activatedRoute.snapshot.queryParams.start_date, 'YYYY-MM-DD');

        const m = check.format('MMMM');
        const y  = check.format('YYYY');
        this.month = m + ', ' + y;
    }

    ngOnInit() { }

    setExpenseList(expense) {
        expense && expense.length ? this.expenseList = expense : this.expenseList = [];
    }

    setEmployeeDetails(employee) {
        this.employeeDetails = employee;
    }


    selectMonth({ target: {  value: month }}: any) {
        this.selectedMonth = moment(month, 'MMMM').format('M');
        this.getFilteredExpense();
    }

    getFilteredExpense() {
        let url = 'v2/businesses/' + this.storage.user.business_id + '/expense/filter-month';
        url += '?member_id=' + this.memberId + '&month=' + this.selectedMonth;

        this.http.get(url).toPromise().then((res) => {
            this.totalExpensesSum = res.total_expenses_sum;
            this.expenseList = res.expenses;
        });
    }
}

