import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementTenderAddAdditionalComponent } from './procurement-tender-add-additional.component';
import { ProcurementTenderAddAdditionalRoutingModule } from './procurement-tender-add-additional-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ProcurementTenderAddAdditionalComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderAddAdditionalRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        ProcurementTenderAddAdditionalComponent
    ]
})
export class ProcurementTenderAddAdditionalModule { }
