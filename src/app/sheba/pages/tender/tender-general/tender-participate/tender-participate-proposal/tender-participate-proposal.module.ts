import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenderParticipateProposalComponent } from './tender-participate-proposal.component';
import {RouterModule} from '@angular/router';
import { TenderProposalAttachmentComponent } from './tender-proposal-attachment/tender-proposal-attachment.component';
import { TenderProposalBasicComponent } from './tender-proposal-basic/tender-proposal-basic.component';
import { TenderProposalAdvancedComponent } from './tender-proposal-advanced/tender-proposal-advanced.component';
import { TenderProposalSummaryExpansionComponent } from './tender-proposal-summary-expansion/tender-proposal-summary-expansion.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { TenderProposalAdvancedFormComponent } from './tender-proposal-advanced/tender-proposal-advanced-form/tender-proposal-advanced-form.component';
import { TenderProposalAdvancedStepperComponent } from './tender-proposal-advanced/tender-proposal-advanced-stepper/tender-proposal-advanced-stepper.component';
import { TenderProposalAdvancedFormInfoComponent } from './tender-proposal-advanced/tender-proposal-advanced-form/tender-proposal-advanced-form-info/tender-proposal-advanced-form-info.component';
import { TenderProposalAdvancedFormQuotationComponent } from './tender-proposal-advanced/tender-proposal-advanced-form/tender-proposal-advanced-form-quotation/tender-proposal-advanced-form-quotation.component';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TenderProposalAdvancedFormCompanyComponent } from './tender-proposal-advanced/tender-proposal-advanced-form/tender-proposal-advanced-form-company/tender-proposal-advanced-form-company.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import { TenderProposalAdvancedFormTechnicalComponent } from './tender-proposal-advanced/tender-proposal-advanced-form/tender-proposal-advanced-form-technical/tender-proposal-advanced-form-technical.component';
import {MatStepperModule} from '@angular/material/stepper';
import {TenderProposalAccessComponent} from './tender-proposal-access/tender-proposal-access.component';

@NgModule({
  declarations: [
      TenderParticipateProposalComponent,
      TenderProposalAttachmentComponent,
      TenderProposalBasicComponent,
      TenderProposalAdvancedComponent,
      TenderProposalSummaryExpansionComponent,
      TenderProposalAdvancedFormComponent,
      TenderProposalAdvancedStepperComponent,
      TenderProposalAdvancedFormInfoComponent,
      TenderProposalAdvancedFormQuotationComponent,
      TenderProposalAdvancedFormCompanyComponent,
      TenderProposalAdvancedFormTechnicalComponent,
      TenderProposalAccessComponent
  ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatRadioModule,
        MatCheckboxModule,
        MatInputModule,
        MatStepperModule
    ]
})
export class TenderParticipateProposalModule { }
