import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PurchaseRequestCreateRoutingModule} from '../purchase-request-create-routing.module';
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
import {PurchaseRequestFormSelectComponent} from './purchase-request-form-select.component';
import { PurchaseRequestFormCardComponent } from './purchase-request-form-card/purchase-request-form-card.component';

@NgModule({
  declarations: [PurchaseRequestFormSelectComponent,PurchaseRequestFormCardComponent],
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
    entryComponents: [PurchaseRequestFormSelectComponent, PurchaseRequestFormCardComponent],
    exports: [PurchaseRequestFormSelectComponent, PurchaseRequestFormCardComponent],
})
export class PurchaseRequestFormSelectModule { }
