import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VehicleComponent} from './vehicle.component';
import {VehicleListService} from './vehicle-list.service';
import {VehicleInfoService} from './vehicle-details/vehicle-info.service';
import {VehicleAddService} from './vehicle-add.service';
import {DepartmentService} from '../department.service';
import {FleetDriverListService} from '../fleet-driver/fleet-driver-list.service';
import {AllDriversService} from '../all-drivers.service';
import {AllVendorsService} from '../all-vendors.service';

const routes: Routes = [
    {
        path: '',
        component: VehicleComponent,
        children: [
            {
                path: '',
                loadChildren: './vehicle-list/vehicle-list.module#VehicleListModule',
                resolve: {
                    vehicles: VehicleListService,
                    departments: DepartmentService
                },
                data: {
                    name: 'Vehicle List'
                }
            },
            {
                path: 'add',
                loadChildren: './vehicle-add/vehicle-add.module#VehicleAddModule',
                resolve: {
                    departments: VehicleAddService,
                    drivers: AllDriversService,
                    vendors: AllVendorsService,
                },
                data: {
                    name: 'Add Vehicle'
                }
            },
            {
                path: 'assignments',
                loadChildren: './vehicle-assignment/vehicle-assignment.module#VehicleAssignmentModule',
                resolve: {}
            },
            {
                path: ':vehicle_id',
                loadChildren: './vehicle-details/vehicle-details.module#VehicleDetailsModule',
                resolve: {
                    info: VehicleInfoService,
                },
                data: {
                    name: 'Vehicle Details'
                },
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehicleRoutingModule {
}
