import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './expense.component';

const routes: Routes = [
    {
        path: '',
        component: ExpenseComponent,
        children: [
            {
                path: '',
                loadChildren: './expense-list/expense-list.module#ExpenseListModule'
            },
            {
                path: ':expense_id',
                loadChildren: './expense-details/expense-details.module#ExpenseDetailsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExpenseRoutingModule { }
