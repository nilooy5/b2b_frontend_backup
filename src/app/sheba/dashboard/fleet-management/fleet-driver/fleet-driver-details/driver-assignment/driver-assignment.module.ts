import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverAssignmentRoutingModule } from './driver-assignment-routing.module';
import {DriverAssignmentComponent} from './driver-assignment.component';

@NgModule({
    declarations: [
        DriverAssignmentComponent
    ],
    imports: [
        CommonModule,
        DriverAssignmentRoutingModule
    ]
})
export class DriverAssignmentModule { }
