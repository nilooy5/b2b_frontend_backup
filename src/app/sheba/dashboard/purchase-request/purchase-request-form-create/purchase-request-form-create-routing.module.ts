import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PurchaseRequestFormCreateComponent} from "./purchase-request-form-create.component";

const routes: Routes = [
    {
        path: '',
        component: PurchaseRequestFormCreateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestFormCreateRoutingModule { }
