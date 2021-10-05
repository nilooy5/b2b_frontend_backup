import {RouterModule, Routes} from '@angular/router';
import {AttendanceDailyListComponent} from './attendance-daily-list.component';
import {NgModule} from '@angular/core';
import {AttendanceDailyListResolverService} from '../../attendance-services/attendance-daily-list-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: AttendanceDailyListComponent,
        resolve: {
            attendanceDailyListResolver: AttendanceDailyListResolverService
        }
    }
];

@NgModule ({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AttendanceDailyListRoutingModule {}
