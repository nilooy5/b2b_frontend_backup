import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementRoutingModule } from './procurement-routing.module';
import {ProcurementComponent} from './procurement.component';

@NgModule({
    declarations: [
        ProcurementComponent
    ],
    imports: [
        CommonModule,
        ProcurementRoutingModule
    ]
})
export class ProcurementModule { }
