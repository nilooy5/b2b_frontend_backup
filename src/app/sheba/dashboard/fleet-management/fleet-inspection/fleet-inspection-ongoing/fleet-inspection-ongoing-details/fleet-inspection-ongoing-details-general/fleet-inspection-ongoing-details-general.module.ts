import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetInspectionOngoingDetailsGeneralRoutingModule} from './fleet-inspection-ongoing-details-general-routing.module';
import {FleetInspectionOngoingDetailsGeneralComponent} from './fleet-inspection-ongoing-details-general.component';
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
    declarations: [
        FleetInspectionOngoingDetailsGeneralComponent
    ],
    imports: [
        CommonModule,
        FleetInspectionOngoingDetailsGeneralRoutingModule,
        LazyLoadImageModule.forRoot({})
    ]
})
export class FleetInspectionOngoingDetailsGeneralModule {
}
