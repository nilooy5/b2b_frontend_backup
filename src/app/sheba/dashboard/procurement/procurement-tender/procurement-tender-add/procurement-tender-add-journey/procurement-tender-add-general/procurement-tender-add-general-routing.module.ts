import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderAddGeneralComponent} from './procurement-tender-add-general.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderAddGeneralComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementTenderAddGeneralRoutingModule { }
