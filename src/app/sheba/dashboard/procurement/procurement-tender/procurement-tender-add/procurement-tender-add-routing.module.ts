import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderAddComponent} from './procurement-tender-add.component';
import {PurchaseRequestFormsService} from '../../../purchase-request/purchase-request-forms.service';
import {MasterCategoriesService} from '../../../vendors/master-categories.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderAddComponent,
        children: [
            {
                path: '',
                loadChildren: './procurement-tender-add-journey/procurement-tender-add-journey.module#ProcurementTenderAddJourneyModule'
            },
            {
                path: 'summary',
                loadChildren: './procurement-tender-add-summary/procurement-tender-add-summary.module#ProcurementTenderAddSummaryModule'
            },
            {
                path: 'success',
                loadChildren: './procurement-tender-add-success/procurement-tender-add-success.module#ProcurementTenderAddSuccessModule'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementTenderAddRoutingModule { }
