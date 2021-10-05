import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AssignmentAddRoutingModule} from './assignment-add-routing.module';
import {AssignmentAddComponent} from './assignment-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule} from "@angular/material";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {ShebaPipesModule} from "../../../../../pipes/sheba-pipes/sheba-pipes.module";

@NgModule({
    declarations: [AssignmentAddComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        AssignmentAddRoutingModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        MatIconModule,
        ShebaPipesModule
    ]
})
export class AssignmentAddModule {
}
