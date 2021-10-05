import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementTenderAddJourneyRoutingModule } from './procurement-tender-add-journey-routing.module';
import { ProcurementTenderAddJourneyComponent } from './procurement-tender-add-journey.component';
import { MatButtonModule, MatProgressBarModule } from '@angular/material';
import {NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        ProcurementTenderAddJourneyComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderAddJourneyRoutingModule,
        MatProgressBarModule,
        MatButtonModule,
        NgbPopoverModule,
    ]
})
export class ProcurementTenderAddJourneyModule { }
