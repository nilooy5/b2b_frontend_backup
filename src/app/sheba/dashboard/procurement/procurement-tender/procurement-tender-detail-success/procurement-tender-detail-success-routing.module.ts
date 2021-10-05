import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcurementTenderDetailSuccessComponent} from './procurement-tender-detail-success.component';


const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderDetailSuccessComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementTenderDetailSuccessRoutingModule { }
