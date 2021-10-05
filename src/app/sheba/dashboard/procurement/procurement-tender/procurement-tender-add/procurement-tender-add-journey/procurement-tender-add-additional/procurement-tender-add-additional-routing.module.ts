import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementTenderAddAdditionalComponent } from './procurement-tender-add-additional.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderAddAdditionalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementTenderAddAdditionalRoutingModule { }
