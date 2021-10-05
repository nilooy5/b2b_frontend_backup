import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleetInspectionFailedItemListFilterComponent} from './fleet-inspection-failed-item-list-filter.component';
import {MatFormFieldModule, MatSelectModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShebaPipesModule} from "../../../../../../../pipes/sheba-pipes/sheba-pipes.module";

@NgModule({
    declarations: [FleetInspectionFailedItemListFilterComponent],
    imports: [
        CommonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        ShebaPipesModule
    ],
    exports: [FleetInspectionFailedItemListFilterComponent]
})
export class FleetInspectionFailedItemListFilterModule {
}
