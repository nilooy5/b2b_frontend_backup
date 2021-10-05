import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProcurementTenderAddSuccessComponent} from './procurement-tender-add-success.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderAddSuccessComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementTenderAddSuccessRoutingModule { }
