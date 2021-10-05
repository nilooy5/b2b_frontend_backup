import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PurchaseRequestCreateComponent} from './purchase-request-create.component';

const routes: Routes = [
    {
        path: '',
        component: PurchaseRequestCreateComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRequestCreateRoutingModule { }
