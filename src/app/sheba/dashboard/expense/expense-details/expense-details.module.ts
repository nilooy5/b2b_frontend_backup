import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseDetailsComponent } from './expense-details.component';
import { ExpenseDetailsRoutingModule } from './expense-details-routing.module';
import { ExpenseEditableTableComponent } from './expense-editable-table/expense-editable-table.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ExpenseDetailsComponent,
        ExpenseEditableTableComponent
    ],
    imports: [
        CommonModule,
        ExpenseDetailsRoutingModule,
        MatTableModule,
        MatButtonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule
    ]
})
export class ExpenseDetailsModule { }
