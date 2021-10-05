import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementOrdersWorkorderTabRoutingModule } from './procurement-orders-workorder-tab-routing.module';
import {ProcurementOrdersWorkorderTabComponent} from './procurement-orders-workorder-tab.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
      ProcurementOrdersWorkorderTabComponent
  ],
    imports: [
        CommonModule,
        ProcurementOrdersWorkorderTabRoutingModule,
        MatButtonModule,
        MatTableModule
    ]
})
export class ProcurementOrdersWorkorderTabModule { }
