import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RfqDetailsGeneralComponent } from './rfq-details-general.component';
import {RfqDetailsComponent} from './rfq-details/rfq-details.component';
import {RfqComparisonComponent} from './rfq-comparison/rfq-comparison.component';
import {RfqBiddingsComponent} from './rfq-biddings/rfq-biddings.component';
import {RfqInvitationsComponent} from './rfq-invitations/rfq-invitations.component';
import {RfqHiringHistoryComponent} from './rfq-hiring-history/rfq-hiring-history.component';
import {RfqListComponent} from '../rfq-list/rfq-list.component';
import {RfqDetailsService} from '../rfq-services/rfq-details-services/rfq-details.service';
import {RfqQuotationComponent} from './rfq-quotation/rfq-quotation.component';
import {RfqHireComponent} from './rfq-hire/rfq-hire.component';
import {RfqBiddingsService} from '../rfq-services/rfq-details-services/rfq-biddings.service';
import {RfqQuotationService} from '../rfq-services/rfq-details-services/rfq-quotation.service';
import {RfqDetailsShowComponent} from './rfq-details/rfq-details-show/rfq-details-show.component';
import {RfqDetailsEditPriceComponent} from './rfq-details/rfq-details-edit-price/rfq-details-edit-price.component';
import {RfqDetailsEditTechnicalComponent} from './rfq-details/rfq-details-edit-technical/rfq-details-edit-technical.component';
import {RfqDetailsEditCompanyComponent} from './rfq-details/rfq-details-edit-company/rfq-details-edit-company.component';
import {RfqDetailsEditService} from '../rfq-services/rfq-details-services/rfq-details-edit.service';
import {RfqCompareService} from '../rfq-services/rfq-details-services/rfq-compare.service';
import {RfqInvitationsService} from '../rfq-services/rfq-details-services/rfq-invitations.service';
import {RfqHiringHistoryService} from '../rfq-services/rfq-details-services/rfq-hiring-history.service';

const routes: Routes = [
    {
        path: '',
        component: RfqDetailsGeneralComponent,
        resolve: { rfqDetails: RfqDetailsService },
        children: [
            {
                path: 'details',
                component: RfqDetailsComponent,
                data: {
                    currentRoute: 'details'
                },
                resolve: { rfqDetails: RfqDetailsService },
                runGuardsAndResolvers: 'always',
                children: [
                    {
                        path: '',
                        component: RfqDetailsShowComponent
                    },
                    {
                        path: 'edit/price',
                        component: RfqDetailsEditPriceComponent,
                        resolve: { rfqDetailsEdit: RfqDetailsEditService },
                    },
                    {
                        path: 'edit/technical',
                        component: RfqDetailsEditTechnicalComponent,
                        resolve: { rfqDetailsEdit: RfqDetailsEditService },
                    },
                    {
                        path: 'edit/company',
                        component: RfqDetailsEditCompanyComponent,
                        resolve: { rfqDetailsEdit: RfqDetailsEditService },
                    },
                    {
                        path: '',
                        redirectTo: ''
                    }
                ]
            },
            {
                path: 'compare',
                component: RfqComparisonComponent,
                resolve: { bidsDetails: RfqCompareService }
            },
            {
                path: 'biddings',
                children: [
                    {
                        path: '',
                        component: RfqBiddingsComponent,
                        resolve: { rfqBiddingDetails: RfqBiddingsService }
                    },
                    {
                        path: ':id',
                        component: RfqQuotationComponent,
                        resolve: { rfqQuotation: RfqQuotationService }
                    },
                    {
                        path: ':id/hire',
                        component: RfqHireComponent,
                        resolve: { rfqQuotation: RfqQuotationService }
                    }
                ]
            },
            {
                path: 'invitations',
                component: RfqInvitationsComponent,
                resolve: { rfqInvitations: RfqInvitationsService }
            },
            {
                path: 'hiring-history',
                component: RfqHiringHistoryComponent,
                resolve: { rfqHiringHistory: RfqHiringHistoryService }
            },
            {
                path: '**',
                redirectTo: 'details'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RfqDetailsGeneralRoutingModule { }
