import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RfqCreateComponent } from './rfq-create.component';
import { RfqCreateGeneralComponent } from './rfq-create-general/rfq-create-general.component';
import { RfqCreateGeneralResolverService } from '../rfq-services/rfq-create-services/rfq-create-general-resolver.service';
import { RfqCreatePriceQuotationComponent } from './rfq-create-price-quotation/rfq-create-price-quotation.component';
import { RfqCreateEvaluationTechnicalComponent } from './rfq-create-evaluation-technical/rfq-create-evaluation-technical.component';
import { RfqCreateEvaluationCompanyComponent } from './rfq-create-evaluation-company/rfq-create-evaluation-company.component';
import { RfqCreateSuccessComponent } from './rfq-create-success/rfq-create-success.component';
import { RfqCreateSuccessGuard } from './rfq-create-success/rfq-create-success.guard';

const routes: Routes = [
    {
        path: '',
        component: RfqCreateComponent,
        children: [
            {
                path: '',
                component: RfqCreateGeneralComponent,
                resolve: {
                    additionalInformation: RfqCreateGeneralResolverService
                }
            },
            {
                path: 'price',
                component: RfqCreatePriceQuotationComponent
            },
            {
                path: 'evaluation',
                children: [
                    {   path: 'technical',  component: RfqCreateEvaluationTechnicalComponent },
                    {   path: 'company',    component: RfqCreateEvaluationCompanyComponent },
                    {   path: '**', redirectTo: 'technical'}
                ]
            },
            {
                path: 'success',
                component: RfqCreateSuccessComponent,
                canActivate: [ RfqCreateSuccessGuard ]
            },
            {
                path: 'invite',
                loadChildren: '../rfq-invite-general/rfq-invite-general.module#RfqInviteGeneralModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RfqCreateRoutingModule { }
