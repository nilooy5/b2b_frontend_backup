import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementComponent} from './procurement.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementComponent,
        children: [
            {
                path: 'orders',
                loadChildren: './procurement-orders/procurement-orders.module#ProcurementOrdersModule'
            },
            {
                path: '',
                loadChildren: './procurement-tender/procurement-tender.module#ProcurementTenderModule'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProcurementRoutingModule { }
