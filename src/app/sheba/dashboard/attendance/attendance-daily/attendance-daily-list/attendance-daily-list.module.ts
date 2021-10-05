import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AttendanceDailyListComponent} from './attendance-daily-list.component';
import { AttendanceDailyListRoutingModule } from './attendance-daily-list-routing.module';
import {MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatTableModule} from '@angular/material';
import {AttendanceDailyListFilterComponent} from './attendance-daily-list-filter/attendance-daily-list-filter.component';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AttendanceDailyListComponent,
        AttendanceDailyListFilterComponent
    ],
    imports: [
        CommonModule,
        AttendanceDailyListRoutingModule,
        MatTableModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        MatMomentDateModule,
        MatIconModule,
        MatButtonModule,
        NgbTooltipModule
    ]
})

export  class AttendanceDailyListModule {}
