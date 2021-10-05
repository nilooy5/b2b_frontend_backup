import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttendanceRoutingModule} from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { MatTabsModule } from '@angular/material';

@NgModule({
    declarations: [
        AttendanceComponent,
    ],
    imports: [
        CommonModule,
        AttendanceRoutingModule,
        MatTabsModule
    ]
})


export class AttendanceModule { }
