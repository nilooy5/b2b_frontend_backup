import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WalletTransactionsComponent} from './wallet-transactions.component';

const routes: Routes = [
    {
        path: '',
        component: WalletTransactionsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletTransactionsRoutingModule { }
