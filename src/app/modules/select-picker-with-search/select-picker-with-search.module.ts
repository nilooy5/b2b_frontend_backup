import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectPickerWithSearchComponent} from './select-picker-with-search/select-picker-with-search.component';
import {SelectPickerItemComponent} from './select-picker-item/select-picker-item.component';
import {MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OverlayModule} from "@angular/cdk/overlay";
import {A11yModule} from "@angular/cdk/a11y";
import {ShebaPipesModule} from "../../pipes/sheba-pipes/sheba-pipes.module";

@NgModule({
    declarations: [SelectPickerWithSearchComponent, SelectPickerItemComponent],
    imports: [
        CommonModule,
        MatSelectModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        OverlayModule,
        A11yModule,
        ShebaPipesModule
    ],
    exports: [SelectPickerWithSearchComponent]
})
export class SelectPickerWithSearchModule {
}
