import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormTemplateSelectSearchComponent} from './form-template-select-search/form-template-select-search.component';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {FormTemplateSelectSearchService} from "./form-template-select-search.service";
import {ShebaPipesModule} from "../../../../pipes/sheba-pipes/sheba-pipes.module";
import {RouterModule} from "@angular/router";

@NgModule({
    declarations: [FormTemplateSelectSearchComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ShebaPipesModule,
        MatButtonModule,
        RouterModule,
        MatProgressSpinnerModule
    ],
    entryComponents: [FormTemplateSelectSearchComponent],
    providers: [FormTemplateSelectSearchService]
})
export class FormTemplateSelectSearchModule {
}
