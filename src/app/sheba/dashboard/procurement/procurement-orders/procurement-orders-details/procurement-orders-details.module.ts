import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementOrdersDetailsComponent } from './procurement-orders-details.component';
import { ProcurementOrdersDetailsRoutingModule } from './procurement-orders-details-routing.module';
import { MatTabsModule } from '@angular/material';

@NgModule({
    declarations: [
        ProcurementOrdersDetailsComponent
    ],
    imports: [
        CommonModule,
        ProcurementOrdersDetailsRoutingModule,
        MatTabsModule
    ]
})

export class ProcurementOrdersDetailsModule { }
