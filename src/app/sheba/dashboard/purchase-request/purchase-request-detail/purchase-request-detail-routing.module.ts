import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PurchaseRequestDetailComponent} from './purchase-request-detail.component';

const routes: Routes = [
    {
        path: '',
        component: PurchaseRequestDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestDetailRoutingModule { }
