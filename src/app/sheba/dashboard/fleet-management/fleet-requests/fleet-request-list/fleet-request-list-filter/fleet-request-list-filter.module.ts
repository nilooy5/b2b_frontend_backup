import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleetRequestListFilterComponent} from './fleet-request-list-filter.component';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule, MatSelectModule} from "@angular/material";
import {ShebaPipesModule} from "../../../../../../pipes/sheba-pipes/sheba-pipes.module";

@NgModule({
    declarations: [FleetRequestListFilterComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        ShebaPipesModule
    ],
    exports: [FleetRequestListFilterComponent]
})
export class FleetRequestListFilterModule {
}
