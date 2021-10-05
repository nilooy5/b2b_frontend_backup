import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcurementTenderDetailMessagingComponent} from './procurement-tender-detail-messaging.component';
import {ProcurementTenderDetailMessagingRoutingModule} from './procurement-tender-detail-messaging-routing.module';
import {MessagingModule} from '../../../../../../../../modules/messaging/messaging.module';

@NgModule({
    declarations: [
        ProcurementTenderDetailMessagingComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderDetailMessagingRoutingModule,
        MessagingModule
    ]
})
export class ProcurementTenderDetailMessagingModule { }
