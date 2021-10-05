import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AttendanceComponent} from './attendance.component';
import {AttendanceService} from './attendance-services/attendance.service';
import {AttendanceMonthlyListResolverService} from './attendance-services/attendance-monthly-list-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: AttendanceComponent,
        children: [
            {
                path: 'daily',
                loadChildren: './attendance-daily/attendance-daily.module#AttendanceDailyModule',
                data: {
                    name: 'Daily Attendance'
                }
            },
            {
                path: 'monthly',
                loadChildren: './attendance-monthly/attendance-monthly.module#AttendanceMonthlyModule',
                data: {
                    name: 'Monthly Attendance'
                }
            },
            {
                path: ':id', /*':employee_id',*/
                loadChildren: './attendance-details/attendance-details.module#AttendanceDetailsModule'
            },
            {
                path: '**',
                redirectTo: 'daily'
            }

        ]
    },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AttendanceRoutingModule {
}
