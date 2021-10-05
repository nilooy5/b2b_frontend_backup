import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PurchaseRequestListComponent} from './purchase-request-list.component';

const routes: Routes = [
    {
        path: '',
        component: PurchaseRequestListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestListRoutingModule { }
