import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRequestFormEditRoutingModule } from './purchase-request-form-edit-routing.module';
import {PurchaseRequestFormEditComponent} from "./purchase-request-form-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule, MatInputModule} from "@angular/material";
import {QuestionsModule} from "../../../../modules/questions/questions.module";


@NgModule({
    declarations: [
        PurchaseRequestFormEditComponent
    ],
    imports: [
        CommonModule,
        PurchaseRequestFormEditRoutingModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        QuestionsModule
    ]
})
export class PurchaseRequestFormEditModule { }
