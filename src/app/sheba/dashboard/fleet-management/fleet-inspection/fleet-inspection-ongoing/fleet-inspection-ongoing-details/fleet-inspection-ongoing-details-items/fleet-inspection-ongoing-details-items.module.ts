import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetInspectionOngoingDetailsItemsRoutingModule} from './fleet-inspection-ongoing-details-items-routing.module';
import {FleetInspectionOngoingDetailsItemsComponent} from './fleet-inspection-ongoing-details-items.component';
import {FleetInspectionFormItemModule} from "../../../fleet-inspection-form/fleet-inspection-form-item/fleet-inspection-form-item.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatBottomSheetModule, MatListModule, MatMenuModule, MatProgressSpinnerModule} from "@angular/material";
import {ConfirmationModule} from "../../../../../../../modules/confirmation/confirmation.module";

@NgModule({
    declarations: [FleetInspectionOngoingDetailsItemsComponent],
    imports: [
        CommonModule,
        FleetInspectionOngoingDetailsItemsRoutingModule,
        FleetInspectionFormItemModule,
        FormsModule,
        ReactiveFormsModule,
        MatBottomSheetModule,
        MatListModule,
        ConfirmationModule,
        MatProgressSpinnerModule,
        MatMenuModule
    ]
})

export class FleetInspectionOngoingDetailsItemsModule {
}
