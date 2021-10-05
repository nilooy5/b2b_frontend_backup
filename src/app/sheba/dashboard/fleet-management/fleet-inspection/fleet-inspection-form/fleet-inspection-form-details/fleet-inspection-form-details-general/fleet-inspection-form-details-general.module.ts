import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetInspectionFormDetailsGeneralRoutingModule} from './fleet-inspection-form-details-general-routing.module';
import {FleetInspectionFormDetailsGeneralComponent} from './fleet-inspection-form-details-general.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule, MatInputModule} from "@angular/material";

@NgModule({
    declarations: [FleetInspectionFormDetailsGeneralComponent],
    imports: [
        CommonModule,
        FleetInspectionFormDetailsGeneralRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class FleetInspectionFormDetailsGeneralModule {
}
