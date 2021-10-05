import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetDriverComponent} from "./fleet-driver.component";
import {FleetDriverResolveService, FleetService} from "../../../../services/fleet.service";
import {DriverInfoService} from './fleet-driver-details/driver-info.service';
import {FleetDriverListService} from './fleet-driver-list.service';
import {DepartmentService} from '../department.service';
import {VehicleListService} from '../vehicle/vehicle-list.service';
import {AllVendorsService} from '../all-vendors.service';

const routes: Routes = [
    {
        path: '',
        component: FleetDriverComponent,
        children: [
            {
                path: '',
                loadChildren: './fleet-driver-list/fleet-driver-list.module#FleetDriverListModule',
                data: {
                    name: 'Driver List'
                },
                resolve: {
                    drivers: FleetDriverListService,
                    departments: DepartmentService
                }
            },
            {
                path: 'add',
                loadChildren: './fleet-driver-add/fleet-driver-add.module#FleetDriverAddModule',
                data: {
                    name: 'Driver Add'
                },
                resolve: {
                    departments: DepartmentService,
                    vehicles: VehicleListService,
                    vendors: AllVendorsService,
                }
            },
            {
                path: ':driver_id',
                loadChildren: './fleet-driver-details/fleet-driver-details.module#FleetDriverDetailsModule',
                data: {
                    name: 'Driver Details'
                },
                resolve: {
                    driver: DriverInfoService
                }
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetDriverRoutingModule {
}
