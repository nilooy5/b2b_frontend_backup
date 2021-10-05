import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfqInviteGeneralComponent } from './rfq-invite-general.component';
import { RouterModule } from '@angular/router';
import { RfqInviteComponent } from './rfq-invite/rfq-invite.component';
import { VendorInvitationComponent } from './rfq-invite/vendor-invitation/vendor-invitation.component';
import { RfqInviteGeneralRoutingModule } from './rfq-invite-general-routing.module';
import { RfqInviteConfirmationComponent } from './rfq-invite-confirmation/rfq-invite-confirmation.component';
import { NoVendorFoundComponent } from './rfq-invite/vendor-invitation/no-vendor-found/no-vendor-found.component';
import { SelectedVendorsPipe } from './rfq-invite/vendor-invitation/selected-vendors.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingModalModule} from '../../../modals/loading-modal/loading-modal.module';

@NgModule({
    declarations: [
        RfqInviteGeneralComponent,
        RfqInviteComponent,
        VendorInvitationComponent,
        RfqInviteConfirmationComponent,
        NoVendorFoundComponent,
        SelectedVendorsPipe
    ],
    imports: [
        CommonModule,
        RouterModule,
        RfqInviteGeneralRoutingModule,
        ReactiveFormsModule,
        LoadingModalModule
    ]
})

export class RfqInviteGeneralModule { }
