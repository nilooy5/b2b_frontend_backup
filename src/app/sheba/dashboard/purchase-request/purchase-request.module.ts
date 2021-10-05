import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRequestRoutingModule } from './purchase-request-routing.module';
import {PurchaseRequestComponent} from "./purchase-request.component";

@NgModule({
    declarations: [
        PurchaseRequestComponent,
    ],
    imports: [
        CommonModule,
        PurchaseRequestRoutingModule,
    ]
})
export class PurchaseRequestModule { }
