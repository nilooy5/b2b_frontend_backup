import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AssignmentListFilterComponent} from "./assignment-list-filter.component";
import {DateRangePickerModule} from "../../../../../../modules/date-range-picker/date-range-picker.module";
import {MatFormFieldModule, MatSelectModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {ShebaPipesModule} from "../../../../../../pipes/sheba-pipes/sheba-pipes.module";

@NgModule({
    declarations: [AssignmentListFilterComponent],
    imports: [
        CommonModule,
        DateRangePickerModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ShebaPipesModule
    ],
    exports: [AssignmentListFilterComponent]
})
export class AssignmentListFilterModule {
}
