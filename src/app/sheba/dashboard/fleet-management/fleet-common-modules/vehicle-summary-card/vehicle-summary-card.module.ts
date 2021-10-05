import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VehicleSummaryCardComponent} from './vehicle-summary-card.component';

@NgModule({
    declarations: [
        VehicleSummaryCardComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        VehicleSummaryCardComponent
    ]
})
export class VehicleSummaryCardModule { }
