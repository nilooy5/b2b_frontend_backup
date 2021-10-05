import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProcurementTenderHiringSuccessComponent} from './procurement-tender-hiring-success.component';
import {ProcurementTenderHiringSuccessRoutingModule} from './procurement-tender-hiring-success-routing.module';

@NgModule({
    declarations: [
        ProcurementTenderHiringSuccessComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderHiringSuccessRoutingModule
    ],
    exports: [
        ProcurementTenderHiringSuccessComponent
    ]
})
export class ProcurementTenderHiringSuccessModule { }
