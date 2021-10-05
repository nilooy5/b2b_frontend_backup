import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleAssignmentRoutingModule } from './vehicle-assignment-routing.module';
import {VehicleAssignmentComponent} from './vehicle-assignment.component';
import {AssignmentCalenderModule} from './assignment-calender/assignment-calender.module';
import {VehicleAssignmentListItemModule} from './vehicle-assignment-list-item/vehicle-assignment-list-item.module';

@NgModule({
    declarations: [
        VehicleAssignmentComponent
    ],
    imports: [
        CommonModule,
        VehicleAssignmentRoutingModule,
        AssignmentCalenderModule,
        VehicleAssignmentListItemModule
    ]
})
export class VehicleAssignmentModule { }
