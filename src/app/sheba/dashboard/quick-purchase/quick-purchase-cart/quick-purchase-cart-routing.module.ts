import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuickPurchaseCartComponent} from './quick-purchase-cart.component';

const routes: Routes = [
    {
        path: '',
        component: QuickPurchaseCartComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickPurchaseCartRoutingModule { }
