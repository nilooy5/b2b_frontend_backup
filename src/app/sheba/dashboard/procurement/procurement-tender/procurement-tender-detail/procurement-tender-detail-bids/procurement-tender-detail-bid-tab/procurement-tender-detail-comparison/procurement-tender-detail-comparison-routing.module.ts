import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderDetailComparisonComponent} from './procurement-tender-detail-comparison.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderDetailComparisonComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderDetailComparisonRoutingModule { }
