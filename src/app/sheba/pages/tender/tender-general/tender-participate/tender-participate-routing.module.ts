import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TenderParticipateComponent } from './tender-participate.component';
import { TenderParticipateProposalComponent } from './tender-participate-proposal/tender-participate-proposal.component';
import {TenderParticipateConfirmationComponent} from './tender-participate-confirmation/tender-participate-confirmation.component';
import {TenderParticipateService} from '../../tender-services/tender-participate.service';

const routes: Routes = [
    {
        path: '',
        component: TenderParticipateComponent,
        children: [
            {
                path: '',
                component: TenderParticipateProposalComponent,
                resolve: {
                    tenderDetails: TenderParticipateService
                }
            },
            {
                path: 'success',
                component: TenderParticipateConfirmationComponent,
                data: {
                    confirmationType: 'Successful'
                }
            },
            {
                path: 'verified-only',
                component: TenderParticipateConfirmationComponent,
                data: {
                    confirmationType: 'Verified'
                }
            },
            {
                path: 'invited-only',
                component: TenderParticipateConfirmationComponent,
                data: {
                    confirmationType: 'Invited'
                }
            },
            {
                path: 'already-submitted',
                component: TenderParticipateConfirmationComponent,
                data: {
                    confirmationType: 'AlreadySubmitted'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TenderParticipateRoutingModule { }
