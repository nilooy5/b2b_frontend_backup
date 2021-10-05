import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRequestFormsRoutingModule } from './purchase-request-forms-routing.module';
import {PurchaseRequestFormsComponent} from "./purchase-request-forms.component";
import { PurchaseRequestFormCardComponent } from './purchase-request-form-card/purchase-request-form-card.component';

@NgModule({
    declarations: [
        PurchaseRequestFormsComponent,
        PurchaseRequestFormCardComponent,
    ],
    imports: [
        CommonModule,
        PurchaseRequestFormsRoutingModule
    ]
})
export class PurchaseRequestFormsModule { }
