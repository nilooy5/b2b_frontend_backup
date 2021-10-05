import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseListComponent } from './expense-list.component';
import { ExpenseListResolverService } from '../expense-services/expense-list-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ExpenseListComponent,
        resolve: {
            expenseListResolver: ExpenseListResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExpenseListRoutingModule { }
