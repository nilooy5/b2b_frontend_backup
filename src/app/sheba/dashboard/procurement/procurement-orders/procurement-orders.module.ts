import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementOrdersComponent } from './procurement-orders.component';
import { ProcurementOrdersRoutingModule } from './procurement-orders-routing.module';

@NgModule({
    declarations: [
        ProcurementOrdersComponent
    ],
    imports: [
        CommonModule,
        ProcurementOrdersRoutingModule
    ]
})

export class ProcurementOrdersModule { }
