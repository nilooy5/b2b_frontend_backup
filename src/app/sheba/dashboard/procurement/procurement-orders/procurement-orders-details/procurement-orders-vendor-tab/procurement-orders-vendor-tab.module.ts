import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementOrdersVendorTabComponent } from './procurement-orders-vendor-tab.component';
import { ProcurementOrdersVendorTabRoutingModule } from './procurement-orders-vendor-tab-routing.module';

@NgModule({
    declarations: [
        ProcurementOrdersVendorTabComponent
    ],
    imports: [
        CommonModule,
        ProcurementOrdersVendorTabRoutingModule
    ]
})

export class ProcurementOrdersVendorTabModule { }
