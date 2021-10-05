import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceDailyComponent } from './attendance-daily.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: AttendanceDailyComponent,
        children: [
            {
                path: '',
                loadChildren: './attendance-daily-list/attendance-daily-list.module#AttendanceDailyListModule',
            }
        ]
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AttendanceDailyRoutingModule { }
