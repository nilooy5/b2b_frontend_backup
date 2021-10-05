import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementOrdersTimelineTabRoutingModule } from './procurement-orders-timeline-tab-routing.module';
import { ProcurementOrdersTimelineTabComponent } from './procurement-orders-timeline-tab.component';

@NgModule({
    declarations: [
        ProcurementOrdersTimelineTabComponent
    ],
    imports: [
        CommonModule,
        ProcurementOrdersTimelineTabRoutingModule
    ]
})

export class ProcurementOrdersTimelineTabModule { }
