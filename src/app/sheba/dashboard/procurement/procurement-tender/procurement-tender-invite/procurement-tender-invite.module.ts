import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderInviteRoutingModule } from './procurement-tender-invite-routing.module';
import {ProcurementTenderInviteComponent} from './procurement-tender-invite.component';
import {MultiSelectWithSearchModule} from '../../../../../modules/multi-select-with-search/multi-select-with-search.module';
import {HeadersModule} from '../../../../headers/headers.module';
import {ConfirmMessageModule} from '../../../fleet-management/confirm-message/confirm-message.module';

@NgModule({
    declarations: [
        ProcurementTenderInviteComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderInviteRoutingModule,
        MultiSelectWithSearchModule,
        HeadersModule,
        ConfirmMessageModule
    ]
})
export class ProcurementTenderInviteModule { }
