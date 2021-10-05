import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RfqInviteGeneralComponent } from './rfq-invite-general.component';
import { RfqInviteComponent } from './rfq-invite/rfq-invite.component';
import {RfqInviteConfirmationComponent} from './rfq-invite-confirmation/rfq-invite-confirmation.component';
import {RfqInviteService} from '../rfq-services/rfq-invite/rfq-invite.service';

const routes: Routes = [
    {
        path: '',
        component: RfqInviteGeneralComponent,
        children: [
            {
                path: '',
                component: RfqInviteComponent,
                resolve: { vendorList: RfqInviteService }
            },
            {
                path: 'successful',
                component: RfqInviteConfirmationComponent,
                data: {
                    confirmationType: 'Success'
                }
            },
            {
                path: 'failed',
                component: RfqInviteConfirmationComponent,
                data: {
                    confirmationType: 'Failed'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RfqInviteGeneralRoutingModule { }
