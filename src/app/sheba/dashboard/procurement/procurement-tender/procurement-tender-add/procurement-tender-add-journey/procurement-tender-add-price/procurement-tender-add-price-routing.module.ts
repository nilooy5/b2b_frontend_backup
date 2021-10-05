import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderAddPriceComponent} from './procurement-tender-add-price.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderAddPriceComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementTenderAddPriceRoutingModule { }
