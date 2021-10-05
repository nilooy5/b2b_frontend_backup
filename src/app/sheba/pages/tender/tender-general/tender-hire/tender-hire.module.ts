import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenderHireComponent } from './tender-hire.component';
import {TenderHireRoutingModule} from './tender-hire-routing.module';
import { TenderHireProposalComponent } from './tender-hire-proposal/tender-hire-proposal.component';
import { TenderHireConfirmationComponent } from './tender-hire-confirmation/tender-hire-confirmation.component';
import { TenderHireTermsComponent } from './tender-hire-proposal/tender-hire-terms/tender-hire-terms.component';
import { TenderHireJobDetailsComponent } from './tender-hire-proposal/tender-hire-job-details/tender-hire-job-details.component';
import { TenderHireRequestedInfoComponent } from './tender-hire-proposal/tender-hire-requested-info/tender-hire-requested-info.component';
import { MatExpansionModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatTableModule, MatDialogModule } from '@angular/material';
import { PriceQuotationTableComponent } from './tender-hire-proposal/price-quotation-table/price-quotation-table.component';
import { TenderProposalVerificationComponent } from './tender-hire-proposal/modals/tender-proposal-verification/tender-proposal-verification.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        TenderHireComponent,
        TenderHireProposalComponent,
        TenderHireConfirmationComponent,
        TenderHireTermsComponent,
        TenderHireJobDetailsComponent,
        TenderHireRequestedInfoComponent,
        PriceQuotationTableComponent,
        TenderProposalVerificationComponent
    ],
    imports: [
        CommonModule,
        TenderHireRoutingModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatTableModule,
        MatDialogModule,
        FormsModule
    ],
    entryComponents: [TenderProposalVerificationComponent]
})

export class TenderHireModule { }
