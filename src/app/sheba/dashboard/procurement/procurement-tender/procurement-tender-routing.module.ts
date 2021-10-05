import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcurementTenderComponent} from './procurement-tender.component';
import {PurchaseRequestFormsService} from '../../purchase-request/purchase-request-forms.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderComponent,
        children: [
            {
                path: '',
                loadChildren: './procurement-tender-list/procurement-tender-list.module#ProcurementTenderListModule'
            },
            {
                path: 'create',
                loadChildren: './procurement-tender-add/procurement-tender-add.module#ProcurementTenderAddModule',
            },
            {
                path: 'invite',
                loadChildren: './procurement-tender-invite/procurement-tender-invite.module#ProcurementTenderInviteModule',
            },
            {
                path: 'success',
                loadChildren: './procurement-tender-detail-success/procurement-tender-detail-success.module#ProcurementTenderDetailSuccessModule',
            },
            {
                path: 'hiring',
                loadChildren: './procurement-tender-hiring/procurement-tender-hiring.module#ProcurementTenderHiringModule',
            },
            {
                path: ':procurement_id',
                loadChildren: './procurement-tender-detail/procurement-tender-detail.module#ProcurementTenderDetailModule',
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderRoutingModule { }
