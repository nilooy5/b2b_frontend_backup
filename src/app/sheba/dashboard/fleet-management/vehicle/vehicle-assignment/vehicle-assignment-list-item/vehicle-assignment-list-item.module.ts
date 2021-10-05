import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VehicleAssignmentListItemComponent} from './vehicle-assignment-list-item.component';

@NgModule({
    declarations: [VehicleAssignmentListItemComponent],
    imports: [
        CommonModule
    ],
    exports: [
        VehicleAssignmentListItemComponent
    ]
})
export class VehicleAssignmentListItemModule { }
