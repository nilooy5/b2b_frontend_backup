  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    MatFormFieldModule, MatInputModule, MatDatepickerModule,
    MatIconModule, MatNativeDateModule,
    MatSelectModule, MatDialogModule
} from '@angular/material';
import {QuestionsModule} from "../../../../modules/questions/questions.module";
import {PurchaseRequestCreateRoutingModule} from './purchase-request-create-routing.module';
import {PurchaseRequestCreateComponent} from './purchase-request-create.component';
import {MatRadioModule} from '@angular/material';
import {EditableTableModule} from '../../../../modules/editable-table/editable-table.module';
import { PurchaseRequestFormSelectModule } from './purchase-request-form-select/purchase-request-form-select.module';


  @NgModule({
    declarations: [
        PurchaseRequestCreateComponent
    ],
    imports: [
        CommonModule,
        PurchaseRequestCreateRoutingModule,
        PurchaseRequestFormSelectModule,
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
    ]
})
export class PurchaseRequestCreateModule { }
