import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementTenderHiringDetailsComponent } from './procurement-tender-hiring-details.component';
import { ProcurementTenderHiringDetailsRoutingModule } from './procurement-tender-hiring-details-routing.module';
import {MatTableModule} from '@angular/material';

@NgModule({
    declarations: [
        ProcurementTenderHiringDetailsComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderHiringDetailsRoutingModule,
        MatTableModule
    ],
    exports: [
        ProcurementTenderHiringDetailsComponent
    ]
})
export class ProcurementTenderHiringDetailsModule { }
