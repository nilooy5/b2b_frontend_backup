import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VehicleDetailsComponent} from './vehicle-details.component';
import {VehicleHandlerFetchService, VehicleInfoService} from './vehicle-info.service';
import {VehicleRegistrationInfoService} from './vehicle-registration-info.service';
import {VehicleSpecsInfoService} from './vehicle-specs-info.service';
import {VehicleDetailsAssignmentService} from './vehicle-details-assignment.service';
import {DepartmentService} from '../../department.service';

const routes: Routes = [
    {
        path: '',
        component: VehicleDetailsComponent,
        children: [
            {
                path: 'info',
                loadChildren: './vehicle-info/vehicle-info.module#VehicleInfoModule',
                resolve: {
                    generalInfo: VehicleInfoService,
                    registrationInfo: VehicleRegistrationInfoService,
                    SpecsInfo: VehicleSpecsInfoService,
                    departments: DepartmentService,
                    handlerInfo: VehicleHandlerFetchService
                },
            },
            {
                path: 'assignment',
                loadChildren: './vehicle-details-assignment/vehicle-details-assignment.module#VehicleDetailsAssignmentModule',
                resolve: {
                    assignments: VehicleDetailsAssignmentService,
                },
            },
            {
                path: 'history',
                loadChildren: './vehicle-history/vehicle-history.module#VehicleHistoryModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehicleDetailsRoutingModule {
}
