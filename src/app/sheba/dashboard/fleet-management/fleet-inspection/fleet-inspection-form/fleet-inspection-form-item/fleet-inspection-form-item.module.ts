import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleetInspectionFormItemComponent} from './fleet-inspection-form-item.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule} from "@angular/material";

@NgModule({
    declarations: [FleetInspectionFormItemComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports: [FleetInspectionFormItemComponent]
})
export class FleetInspectionFormItemModule {
}
