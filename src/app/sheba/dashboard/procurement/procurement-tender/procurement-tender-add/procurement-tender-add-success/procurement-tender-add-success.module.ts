import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcurementTenderAddSuccessComponent} from './procurement-tender-add-success.component';
import {ProcurementTenderAddSuccessRoutingModule} from './procurement-tender-add-success--routing.module';

@NgModule({
    declarations: [
        ProcurementTenderAddSuccessComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderAddSuccessRoutingModule
    ],
    exports: [
        ProcurementTenderAddSuccessComponent
    ]
})
export class ProcurementTenderAddSuccessModule { }
