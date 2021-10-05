import {NgModule} from '@angular/core';
import {AttendanceDetailsComponent} from './attendance-details.component';
import {CommonModule} from '@angular/common';
import {AttendanceDetailsRoutingModule} from './attendance-details-routing.module';
import {MatButtonModule, MatTableModule} from '@angular/material';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AttendanceDetailsComponent
    ],
    imports: [
        CommonModule,
        AttendanceDetailsRoutingModule,
        MatTableModule,
        MatButtonModule,
        NgbTooltipModule
    ]
})

export class AttendanceDetailsModule { }
