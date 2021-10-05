import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcurementTenderAddCompanyComponent } from './procurement-tender-add-company.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderAddCompanyComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderAddCompanyRoutingModule { }
