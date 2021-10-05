import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementOrdersDetailsComponent } from './procurement-orders-details.component';
import { ProcurementOrdersDetailsService } from './procurement-orders-details.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementOrdersDetailsComponent,
        resolve: {
            procurementOrdersDetails: ProcurementOrdersDetailsService
        },
        children: [
            {
                path: '',
                loadChildren: './procurement-orders-detail-tab/procurement-orders-detail-tab.module#ProcurementOrdersDetailTabModule'
            },
            {
                path: 'bill',
                loadChildren: './procurement-orders-bill-tab/procurement-orders-bill-tab.module#ProcurementOrdersBillTabModule'
            },
            {
                path: 'vendor',
                loadChildren: './procurement-orders-vendor-tab/procurement-orders-vendor-tab.module#ProcurementOrdersVendorTabModule'
            },
            {
                path: 'workorder',
                loadChildren: './procurement-orders-workorder-tab/procurement-orders-workorder-tab.module#ProcurementOrdersWorkorderTabModule'
            },
            {
                path: 'timeline',
                loadChildren: './procurement-orders-timeline-tab/procurement-orders-timeline-tab.module#ProcurementOrdersTimelineTabModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementOrdersDetailsRoutingModule { }
