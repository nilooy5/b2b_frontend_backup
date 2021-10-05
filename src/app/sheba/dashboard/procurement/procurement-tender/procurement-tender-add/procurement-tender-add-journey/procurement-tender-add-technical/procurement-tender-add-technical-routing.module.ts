import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderAddTechnicalComponent} from './procurement-tender-add-technical.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderAddTechnicalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderAddTechnicalRoutingModule { }
