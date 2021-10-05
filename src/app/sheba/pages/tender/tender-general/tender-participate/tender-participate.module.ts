import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenderParticipateComponent } from './tender-participate.component';
import { TenderParticipateRoutingModule } from './tender-participate-routing.module';
import { TenderParticipateProposalModule } from './tender-participate-proposal/tender-participate-proposal.module';
import { TenderParticipateConfirmationComponent } from './tender-participate-confirmation/tender-participate-confirmation.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    declarations: [
        TenderParticipateComponent,
        TenderParticipateConfirmationComponent
    ],
    imports: [
        CommonModule,
        TenderParticipateProposalModule,
        TenderParticipateRoutingModule,
        MatButtonModule
    ]
})

export class TenderParticipateModule { }
