import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TenderHireComponent} from './tender-hire.component';
import {TenderHireProposalComponent} from './tender-hire-proposal/tender-hire-proposal.component';
import {TenderHireConfirmationComponent} from './tender-hire-confirmation/tender-hire-confirmation.component';
import {TenderHireService} from '../../tender-services/tender-hire.service';

const routes: Routes = [
    {
        path: '',
        component: TenderHireComponent,
        children: [
            {
                path: '',
                component: TenderHireProposalComponent,
                resolve: { tenderHireDetails: TenderHireService }
            },
            {
                path: 'accepted',
                component: TenderHireConfirmationComponent,
                data: {
                    confirmationType: 'Accepted'
                }
            },
            {
                path: 'rejected',
                component: TenderHireConfirmationComponent,
                data: {
                    confirmationType: 'Rejected'
                }
            },
            {
                path: 'failed',
                component: TenderHireConfirmationComponent,
                data: {
                    confirmationType: 'Failed'
                }
            },
            {
                path: 'access-denied',
                component: TenderHireConfirmationComponent,
                data: {
                    confirmationType: 'Denied'
                }
            },
            {
                path: 'not-found',
                component: TenderHireConfirmationComponent,
                data: {
                    confirmationType: 'NotFound'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TenderHireRoutingModule { }
