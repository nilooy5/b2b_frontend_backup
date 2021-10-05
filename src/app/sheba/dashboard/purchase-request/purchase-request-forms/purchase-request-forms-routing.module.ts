import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PurchaseRequestFormsComponent} from "./purchase-request-forms.component";

const routes: Routes = [
    {
        path: '',
        component: PurchaseRequestFormsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestFormsRoutingModule { }
