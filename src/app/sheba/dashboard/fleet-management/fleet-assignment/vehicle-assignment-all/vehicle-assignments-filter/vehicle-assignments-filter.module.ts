import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VehicleAssignmentsFilterComponent} from './vehicle-assignments-filter.component';
import {FormsModule} from "@angular/forms";
import {
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule, MatIconModule, MatInputModule,
    MatNativeDateModule,
    MatSelectModule
} from "@angular/material";

@NgModule({
    declarations: [VehicleAssignmentsFilterComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [VehicleAssignmentsFilterComponent]
})
export class VehicleAssignmentsFilterModule {
}
