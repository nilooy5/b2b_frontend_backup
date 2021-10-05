import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementOrdersDetailTabComponent } from './procurement-orders-detail-tab.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementOrdersDetailTabComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementOrdersDetailTabRoutingModule { }
