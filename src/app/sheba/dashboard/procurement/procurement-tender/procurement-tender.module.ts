import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderRoutingModule } from './procurement-tender-routing.module';
import {ProcurementTenderComponent} from './procurement-tender.component';

@NgModule({
    declarations: [
        ProcurementTenderComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderRoutingModule
    ],
    exports: [
        ProcurementTenderComponent
    ]
})
export class ProcurementTenderModule { }
