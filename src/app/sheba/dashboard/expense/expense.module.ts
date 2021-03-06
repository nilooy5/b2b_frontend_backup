import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseComponent } from './expense.component';
import { ExpenseRoutingModule } from './expense-routing.module';

@NgModule({
    declarations: [
        ExpenseComponent
    ],
    imports: [
        CommonModule,
        ExpenseRoutingModule
    ]
})
export class ExpenseModule { }
