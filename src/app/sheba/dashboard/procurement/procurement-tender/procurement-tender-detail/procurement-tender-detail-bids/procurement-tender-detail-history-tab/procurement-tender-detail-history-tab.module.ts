import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcurementTenderDetailHistoryTabRoutingModule } from './procurement-tender-detail-history-tab-routing.module';
import {ProcurementTenderDetailHistoryTabComponent} from './procurement-tender-detail-history-tab.component';
import {MatTableModule} from '@angular/material';

@NgModule({
    declarations: [
        ProcurementTenderDetailHistoryTabComponent
    ],
    imports: [
        CommonModule,
        ProcurementTenderDetailHistoryTabRoutingModule,
        MatTableModule
    ]
})
export class ProcurementTenderDetailHistoryTabModule { }
