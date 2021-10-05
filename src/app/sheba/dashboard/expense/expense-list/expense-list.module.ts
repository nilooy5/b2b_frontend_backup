import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ExpenseListComponent } from './expense-list.component';
import { ExpenseListRoutingModule } from './expense-list-routing.module';
import { ExpenseListFilterComponent } from './expense-list-filter/expense-list-filter.component';


@NgModule({
    declarations: [
        ExpenseListComponent,
        ExpenseListFilterComponent
    ],
    imports: [
        CommonModule,
        ExpenseListRoutingModule,
        MatTableModule,
        FormsModule
    ]
})

export class ExpenseListModule { }
