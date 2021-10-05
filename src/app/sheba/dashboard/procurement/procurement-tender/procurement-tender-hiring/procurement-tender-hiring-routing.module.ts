import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementTenderHiringComponent } from './procurement-tender-hiring.component';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderHiringComponent,
        children: [
            {
                path: 'request',
                loadChildren: './procurement-tender-hiring-request/procurement-tender-hiring-request.module#ProcurementTenderHiringRequestModule'
            },
            {
                path: 'details',
                loadChildren: './procurement-tender-hiring-details/procurement-tender-hiring-details.module#ProcurementTenderHiringDetailsModule'
            },
            {
                path: 'success',
                loadChildren: './procurement-tender-hiring-success/procurement-tender-hiring-success.module#ProcurementTenderHiringSuccessModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementTenderHiringRoutingModule { }
