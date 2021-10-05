import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementOrdersDetailTabComponent } from './procurement-orders-detail-tab.component';
import { ProcurementOrdersDetailTabRoutingModule } from './procurement-orders-detail-tab-routing.module';
import { MatTableModule } from '@angular/material';
import { ShebaWidgetsModule } from '../../../../../../modules/sheba-widgets/sheba-widgets.module';
import { CommentsModule } from '../../../../../../modules/comments/comments.module';

@NgModule({
    declarations: [
        ProcurementOrdersDetailTabComponent
    ],
    imports: [
        CommonModule,
        ProcurementOrdersDetailTabRoutingModule,
        MatTableModule,
        ShebaWidgetsModule,
        CommentsModule
    ]
})

export class ProcurementOrdersDetailTabModule { }
