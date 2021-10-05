import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleetInspectionOngoingListFilterComponent} from './fleet-inspection-ongoing-list-filter.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material";

@NgModule({
    declarations: [FleetInspectionOngoingListFilterComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
    ],
    exports: [FleetInspectionOngoingListFilterComponent]
})
export class FleetInspectionOngoingListFilterModule {
}
