import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetInspectionRoutingModule} from './fleet-inspection-routing.module';
import {FleetInspectionComponent} from './fleet-inspection.component';
import {MatTabsModule} from "@angular/material";

@NgModule({
    declarations: [FleetInspectionComponent],
    imports: [
        CommonModule,
        FleetInspectionRoutingModule,
        MatTabsModule
    ]
})
export class FleetInspectionModule {
}
