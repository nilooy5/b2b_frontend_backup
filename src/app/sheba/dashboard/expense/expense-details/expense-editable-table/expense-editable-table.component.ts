import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import { TableDataSource, ValidatorService } from 'angular4-material-table';
import { IExpense } from '../../../../../types/expense';
import { ExpenseValidatorService } from './expense-validator.service';
import { ExpenseService } from '../../expense-services/expense.service';
import { PopAlertService } from '../../../../../modules/pop-alert/pop-alert.service';
import { getErrorMessage } from '../../../../../helpers/functions';
import { environment } from '../../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../../services/storage.service';

export class Expense {
    id: number;
    type: string;
    amount: number;
    remarks: string;
    attachments: any;
}

@Component({
    selector: 'app-expense-editable-table',
    templateUrl: './expense-editable-table.component.html',
    styleUrls: ['./expense-editable-table.component.scss'],
    providers: [
        {provide: ValidatorService, useClass: ExpenseValidatorService}
    ],
})
export class ExpenseEditableTableComponent implements OnInit, OnChanges {

    memberId: number;
    month: number;
    year: number;

    @Input() expenseList: IExpense[];
    @Input() selectedMonth  ;

    constructor(private expenseService: ExpenseService,
                private pop: PopAlertService,
                private storage: StorageService,
                private activatedRoute: ActivatedRoute,
                private expenseValidator: ValidatorService) {

    }

    displayedColumns = ['type', 'amount', 'remarks', 'attachment', 'actionsColumn'];

    @Output() expenseListChange = new EventEmitter<Expense[]>();

    dataSource: TableDataSource<Expense>;

    ngOnInit() {
        this.memberId = parseInt(this.activatedRoute.snapshot.queryParams.member);
        this.year = new Date().getFullYear();
        this.month = this.activatedRoute.snapshot.queryParams.month;

        this.dataSource = new TableDataSource<any>(this.expenseList, Expense, this.expenseValidator);
        this.dataSource.datasourceSubject.subscribe(expenseList => this.expenseListChange.emit(expenseList));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.expenseList !== undefined) {
            this.dataSource = new TableDataSource<any>(changes.expenseList.currentValue, Expense, this.expenseValidator);
        }

        if (changes.selectedMonth !== undefined) {
            this.month = changes.selectedMonth.currentValue;
        }
    }

    findAttachments(control) {
        if (control.value.length) {
            return control.value.length + ' file';
        }
        return 'N/A';
    }

    hasAttachments(control: any) {
        return control.value.length;
    }

    updateExpenseAmount(element) {
        if (element.validator.status === 'VALID') {
                this.expenseService.postEditedExpenseAmount(element.currentData.id, element.currentData.amount).toPromise().then((res) => {
                    if (res.code === 200) {
                        this.pop.open('Amount Updated');
                    } else {
                        this.pop.open(res.message);
                    }
                }).catch((err) => {
                    this.pop.open(getErrorMessage(err));
                });
                element.confirmEditCreate();
        } else {
            this.pop.open('Amount is required');
        }

    }

    downloadExpensePdf() {
        return environment.api_url + 'v2/businesses/'  + this.storage.user.business_id + '/expense/download-pdf?token='
            + this.storage.user.token + '&member_id=' + this.memberId + '&month=' + this.month + '&year=' + this.year;
    }
}
