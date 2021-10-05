import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderDetailFormComponent} from './procurement-tender-detail-form.component';
import {ProcurementTenderDetailFormService} from './procurement-tender-detail-form.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderDetailFormComponent,
        resolve: {
            procurementDetails: ProcurementTenderDetailFormService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderDetailFormRoutingModule { }
