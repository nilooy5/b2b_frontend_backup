import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementTenderHiringComponent } from './procurement-tender-hiring.component';
import { ProcurementTenderHiringRoutingModule } from './procurement-tender-hiring-routing.module';

@NgModule({
    declarations: [
        ProcurementTenderHiringComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderHiringRoutingModule
    ]
})
export class ProcurementTenderHiringModule { }
