import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PurchaseRequestFormDetailComponent} from "./purchase-request-form-detail.component";

const routes: Routes = [
    {
        path: '',
        component: PurchaseRequestFormDetailComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestFormDetailRoutingModule { }
