import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRequestFormCreateRoutingModule } from './purchase-request-form-create-routing.module';
import {PurchaseRequestFormCreateComponent} from "./purchase-request-form-create.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule, MatInputModule} from "@angular/material";
import {QuestionsModule} from "../../../../modules/questions/questions.module";


@NgModule({
    declarations: [
        PurchaseRequestFormCreateComponent
    ],
    imports: [
        CommonModule,
        PurchaseRequestFormCreateRoutingModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        QuestionsModule
    ]
})
export class PurchaseRequestFormCreateModule { }
