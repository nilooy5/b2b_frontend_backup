import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRequestsRoutingModule } from './leave-requests-routing.module';
import {LeaveRequestsComponent} from './leave-requests.component';
import {ConfirmDeclineModalComponent} from './modals/confirm-decline-modal/confirm-decline-modal.component';
import {MatDialogModule} from '@angular/material';
import {ConfirmModalModule} from '../../../modals/confirm-modal/confirm-modal.module';

@NgModule({
    declarations: [
        LeaveRequestsComponent,
        ConfirmDeclineModalComponent
    ],
    imports: [
        CommonModule,
        LeaveRequestsRoutingModule,
        MatDialogModule,
        ConfirmModalModule,
    ],
    entryComponents: [ConfirmDeclineModalComponent]
})
export class LeaveRequestsModule { }
