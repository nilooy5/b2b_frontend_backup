import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetInspectionHistoryDetailsRoutingModule } from './fleet-inspection-history-details-routing.module';
import {FleetInspectionHistoryDetailsComponent} from './fleet-inspection-history-details.component';
import {MatDialogModule} from '@angular/material';
import {AcknowledgementModalModule} from './acknowledgement-modal/acknowledgement-modal.module';

@NgModule({
    declarations: [
        FleetInspectionHistoryDetailsComponent
    ],
    imports: [
        CommonModule,
        FleetInspectionHistoryDetailsRoutingModule,
        MatDialogModule,
        AcknowledgementModalModule
    ]
})
export class FleetInspectionHistoryDetailsModule { }
