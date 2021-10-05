import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatDatepickerModule, MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
} from '@angular/material';
import {QuestionsModule} from '../../../../../modules/questions/questions.module';
import {EditableTableModule} from '../../../../../modules/editable-table/editable-table.module';
import {PurchaseRequestApprovalComponent} from './purchase-request-approval.component';
import { PurchaseRequestMemberCardComponent } from './purchase-request-member-card/purchase-request-member-card.component';

@NgModule({
  declarations: [PurchaseRequestApprovalComponent, PurchaseRequestMemberCardComponent],
  imports: [
      CommonModule,
      FormsModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      QuestionsModule,
      MatRadioModule,
      FormsModule,
      MatSelectModule,
      MatIconModule,
      MatDatepickerModule,
      MatNativeDateModule,
      EditableTableModule,
      MatDialogModule,
  ],
    entryComponents: [PurchaseRequestApprovalComponent, PurchaseRequestMemberCardComponent],
    exports: [PurchaseRequestApprovalComponent, PurchaseRequestMemberCardComponent],
})
export class PurchaseRequestApprovalModule { }
