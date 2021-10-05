import {RouterModule, Routes} from '@angular/router';
import {AttendanceDetailsComponent} from './attendance-details.component';
import {NgModule} from '@angular/core';
import {AttendanceDetailsResolverService} from '../attendance-services/attendance-details-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: AttendanceDetailsComponent,
        resolve: {
            attendanceDetailsResolver: AttendanceDetailsResolverService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AttendanceDetailsRoutingModule {}
