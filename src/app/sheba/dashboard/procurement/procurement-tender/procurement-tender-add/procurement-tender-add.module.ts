import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderAddRoutingModule } from './procurement-tender-add-routing.module';
import { ProcurementTenderAddComponent } from './procurement-tender-add.component';

@NgModule({
    declarations: [
        ProcurementTenderAddComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderAddRoutingModule
    ]
})
export class ProcurementTenderAddModule { }
