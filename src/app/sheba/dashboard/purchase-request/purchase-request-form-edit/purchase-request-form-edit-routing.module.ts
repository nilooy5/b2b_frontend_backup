import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PurchaseRequestFormEditComponent} from "./purchase-request-form-edit.component";

const routes: Routes = [
    {
        path: '',
        component: PurchaseRequestFormEditComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestFormEditRoutingModule { }
