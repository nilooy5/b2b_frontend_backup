import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetInspectionFormAddRoutingModule} from './fleet-inspection-form-add-routing.module';
import {FleetInspectionFormAddComponent} from './fleet-inspection-form-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    ErrorStateMatcher, MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule, MatProgressSpinnerModule
} from "@angular/material";
import {CustomErrorStateMatcher} from "../../../../../../modules/extras/custom-error-state-matcher";
import {FleetInspectionFormItemModule} from "../fleet-inspection-form-item/fleet-inspection-form-item.module";

@NgModule({
    declarations: [FleetInspectionFormAddComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FleetInspectionFormAddRoutingModule,
        MatMenuModule,
        MatCheckboxModule,
        MatButtonModule,
        FleetInspectionFormItemModule,
        MatProgressSpinnerModule
    ],
    providers: [
        {
            provide: ErrorStateMatcher,
            useClass: CustomErrorStateMatcher
        }
    ]
})
export class FleetInspectionFormAddModule {
}
