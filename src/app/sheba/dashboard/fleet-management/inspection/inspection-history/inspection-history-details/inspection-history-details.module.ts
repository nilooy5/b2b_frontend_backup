import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InspectionHistoryDetailsRoutingModule } from './inspection-history-details-routing.module';
import {InspectionHistoryDetailsComponent} from './inspection-history-details.component';
import {MatDialogModule} from '@angular/material';
import {AcknowledgementModalModule} from '../../../fleet-inspection/fleet-inspection-history/fleet-inspection-history-details/acknowledgement-modal/acknowledgement-modal.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';

@NgModule({
    declarations: [
        InspectionHistoryDetailsComponent
    ],
    imports: [
        CommonModule,
        InspectionHistoryDetailsRoutingModule,
        MatDialogModule,
        AcknowledgementModalModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule,
    ]
})
export class InspectionHistoryDetailsModule { }
