import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetInspectionFormDetailsItemsRoutingModule} from './fleet-inspection-form-details-items-routing.module';
import {FleetInspectionFormDetailsItemsComponent} from './fleet-inspection-form-details-items.component';
import {FleetInspectionFormItemModule} from "../../fleet-inspection-form-item/fleet-inspection-form-item.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatBottomSheetModule, MatListModule, MatMenuModule} from "@angular/material";
import {ConfirmationModule} from "../../../../../../../modules/confirmation/confirmation.module";

@NgModule({
    declarations: [FleetInspectionFormDetailsItemsComponent],
    imports: [
        CommonModule,
        FleetInspectionFormDetailsItemsRoutingModule,
        FleetInspectionFormItemModule,
        FormsModule,
        ReactiveFormsModule,
        MatBottomSheetModule,
        MatListModule,
        ConfirmationModule,
        MatMenuModule
    ]
})
export class FleetInspectionFormDetailsItemsModule {
}
