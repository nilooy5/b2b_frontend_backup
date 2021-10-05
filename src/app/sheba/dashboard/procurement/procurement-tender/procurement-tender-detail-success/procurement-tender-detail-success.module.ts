import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcurementTenderDetailSuccessComponent} from './procurement-tender-detail-success.component';
import {ProcurementTenderDetailSuccessRoutingModule} from './procurement-tender-detail-success-routing.module';

@NgModule({
    declarations: [
        ProcurementTenderDetailSuccessComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderDetailSuccessRoutingModule
    ],
    exports: [
        ProcurementTenderDetailSuccessComponent
    ]
})
export class ProcurementTenderDetailSuccessModule { }
