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
import {PurchaseRequestRejectNoteComponent} from './purchase-request-reject-note.component';

@NgModule({
  declarations: [PurchaseRequestRejectNoteComponent],
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
    entryComponents: [PurchaseRequestRejectNoteComponent],
    exports: [PurchaseRequestRejectNoteComponent],
})
export class PurchaseRequestRejectNoteModule { }
