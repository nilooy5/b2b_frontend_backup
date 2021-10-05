import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementOrdersComponent } from './procurement-orders.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementOrdersComponent,
        children: [
            {
                path: '',
                loadChildren: './procurement-orders-list/procurement-orders-list.module#ProcurementOrdersListModule'
            },
            {
                path: ':order_id',
                loadChildren: './procurement-orders-details/procurement-orders-details.module#ProcurementOrdersDetailsModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementOrdersRoutingModule { }
