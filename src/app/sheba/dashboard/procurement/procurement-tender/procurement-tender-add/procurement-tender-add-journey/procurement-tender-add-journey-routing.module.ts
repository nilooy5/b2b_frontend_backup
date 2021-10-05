import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderAddJourneyComponent} from './procurement-tender-add-journey.component';
import {RFQGuardService} from '../../../../../../guards/rfq-guard.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderAddJourneyComponent,
        children: [
            {
                path: '',
                loadChildren: './procurement-tender-add-general/procurement-tender-add-general.module#ProcurementTenderAddGeneralModule'
            },
            {
                path: 'additional-information',
                loadChildren: './procurement-tender-add-additional/procurement-tender-add-additional.module#ProcurementTenderAddAdditionalModule'
            },
            {
                path: 'price-quotation',
                loadChildren: './procurement-tender-add-price/procurement-tender-add-price.module#ProcurementTenderAddPriceModule'
            },
            {
                path: 'company-evaluation',
                loadChildren: './procurement-tender-add-company/procurement-tender-add-company.module#ProcurementTenderAddCompanyModule'
            },
            {
                path: 'technical-evaluation',
                loadChildren: './procurement-tender-add-technical/procurement-tender-add-technical.module#ProcurementTenderAddTechnicalModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderAddJourneyRoutingModule { }
