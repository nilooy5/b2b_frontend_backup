import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetInspectionAddRoutingModule} from './fleet-inspection-add-routing.module';
import {FleetInspectionAddComponent} from './fleet-inspection-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BlockSelectModule} from "../../../../../../modules/block-select/block-select.module";
import {
    MatDatepickerModule,
    MatDividerModule,
    MatInputModule,
    MatNativeDateModule, MatProgressSpinnerModule,
    MatSelectModule
} from "@angular/material";
import {ShebaPipesModule} from "../../../../../../pipes/sheba-pipes/sheba-pipes.module";
import {OnlyDatePickerModule} from "../../../../../../modules/only-date-picker/only-date-picker.module";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {SelectPickerWithSearchModule} from "../../../../../../modules/select-picker-with-search/select-picker-with-search.module";

@NgModule({
    declarations: [FleetInspectionAddComponent],
    imports: [
        CommonModule,
        FleetInspectionAddRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BlockSelectModule,
        MatDividerModule,
        MatSelectModule,
        ShebaPipesModule,
        MatNativeDateModule,
        MatInputModule,
        MatDatepickerModule,
        OnlyDatePickerModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatProgressSpinnerModule,
        SelectPickerWithSearchModule
    ]
})
export class FleetInspectionAddModule {
}
