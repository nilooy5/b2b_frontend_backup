import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { IExpense } from '../../../../types/expense';
import { IEmployee } from '../../../../types/users';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import {ExpenseService} from '../expense-services/expense.service';
import {log} from 'util';
import {ShebaHttpService} from '../../../../modules/sheba-http/sheba-http.service';
import {StorageService} from '../../../../services/storage.service';


@Component({
    selector: 'app-expense-list',
    templateUrl: './expense-list.component.html',
    styleUrls: ['./expense-list.component.scss'],
    providers: [DatePipe]
})

export class ExpenseListComponent implements OnInit {

    static readonly ITEMS_PER_PAGE = 10;

    dataSource: MatTableDataSource<IExpense>;
    expenses: IExpense[];
    filteredExpenses: IExpense[];
    employees: IEmployee[];
    filteredEmployees: IEmployee[];
    departments: any[];
    totalExpensesCount: number;

    displayedColumns = ['month', 'employeeName', 'department', 'amount', 'actions'];

    constructor(private router: Router,
                private http: ShebaHttpService,
                private storage: StorageService,
                private activatedRoute: ActivatedRoute) {

        this.activatedRoute.data.subscribe(({ expenseListResolver }) => {
            const { expenses, departments, employees, totalExpensesCount } = expenseListResolver;
            this.setDepartments(departments);
            this.setEmployees(employees);
            this.setExpense(expenses, totalExpensesCount);
        });

    }

    ngOnInit() { }

    getLimit() {
        return ExpenseListComponent.ITEMS_PER_PAGE;
    }

    setExpense(expenses, totalExpensesCount?) {
        expenses && expenses.length ? this.expenses = expenses : this.expenses = [];
        this.totalExpensesCount = totalExpensesCount;
        this.filteredExpenses = this.expenses;
        this.dataSource = new MatTableDataSource(this.filteredExpenses);
    }

    setDepartments(departments) {
        departments && departments.length ? this.departments = departments : this.departments = [];
    }

    setEmployees(employees) {
        employees && employees.length ? this.employees = employees : this.employees = [];
        this.filteredEmployees = this.employees;
    }

    redirectToExpense(expenseDetails) {
        const params = {
            member: expenseDetails.member_id,
            month: expenseDetails.month
        };
        this.router.navigate(['/', 'dashboard', 'expense', expenseDetails.id], { queryParams: params }).then();
    }

    setFilteredExpenseList(filter) {
        const { department, employee, page, start_date, end_date, key } = filter;
        const filterParams = {
            limit: this.getLimit().toString(),
            offset: page.toString()
        };

        if (start_date && end_date) {
            filterParams['start_date'] = start_date;
            filterParams['end_date'] = end_date;
        }

        if (key) {
            delete filterParams['start_date'];
            delete filterParams['end_date'];
            filterParams['key'] = 'all';
        }

        if (department) {
            if (department !== 'all') {
                filterParams['department_id'] = department;
                this.filteredEmployees = this.employees.filter(item => {
                    return item.department_id === parseInt(department);
                });
            } else {
                filterParams['department_id'] = '';
                this.filteredEmployees = this.employees;
            }
        }

        if (employee) {
            if (employee !== 'all') {
                filterParams['employee_id'] = employee;
            } else {
                filterParams['employee_id'] = '';
            }
        }

        this.getFilteredExpense(filterParams);
    }

    getFilteredExpense(filters) {
        const url = 'v2/businesses/' + this.storage.user.business_id + '/expense';
        this.http.get(url, { params: filters,  responseType: 'text' }).toPromise().then((res) => {
            this.setExpense(JSON.parse(res).expenses, JSON.parse(res).total_expenses_count);
        });

        // this.expenseService.getFilteredExpenses(filters).toPromise().then((res) => {
        //     this.setExpense(JSON.parse(res).expenses, JSON.parse(res).total_expenses_count);
        // });
    }

    handleAlphabeticSort(key) {
        this.filteredExpenses = this.expenses.sort((a, b) => {
            if (key === 'ascending') {
                return a.employee_name.toLowerCase() < b.employee_name.toLowerCase() ? -1 : 1;
            }
            if (key === 'descending') {
                return a.employee_name.toLowerCase() > b.employee_name.toLowerCase() ? -1 : 1;
            }
        });

        this.dataSource = new MatTableDataSource(this.filteredExpenses);
    }

    handleSearch(key) {
        this.filteredExpenses = this.expenses.filter(item => {
            return item.employee_name.toLowerCase().includes(key.toLowerCase())
                || item.employee_department.toLowerCase().includes(key.toLowerCase());
        });
        this.dataSource = new MatTableDataSource(this.filteredExpenses);
    }

}
