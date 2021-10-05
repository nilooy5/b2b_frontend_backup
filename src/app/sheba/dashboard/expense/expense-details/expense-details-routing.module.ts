import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseDetailsComponent } from './expense-details.component';
import { ExpenseDetailsResolverService } from '../expense-services/expense-details-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ExpenseDetailsComponent,
        resolve: {
            expenseDetailsResolver: ExpenseDetailsResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ExpenseDetailsRoutingModule { }
