import {RouterModule, Routes} from '@angular/router';
import {AttendanceMonthlyListComponent} from './attendance-monthly-list.component';
import {NgModule} from '@angular/core';
import {AttendanceMonthlyListResolverService} from '../../attendance-services/attendance-monthly-list-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: AttendanceMonthlyListComponent,
        resolve: {
            attendanceMonthlyListResolver: AttendanceMonthlyListResolverService
        }
    }
];

@NgModule ({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AttendanceMonthlyListRoutingModule {}
