import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionOngoingComponent} from "./fleet-inspection-ongoing.component";
import {
    EmployeeResolveService, FleetInspectionOngoingDetailsResolveService,
    FleetInspectionOngoingListResolveService
} from "./fleet-inspection-ongoing-resolve.service";
import {FleetInspectionFormListResolveService} from "../fleet-inspection-form/fleet-inspection-form-resolve-services";
import {FleetVehicleResolveService} from "../../fleet-assignment/fleet-assignment.service";
import {DepartmentListService} from '../../../hrm-solution/departments/department-list.service';

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionOngoingComponent,
        children: [
            {
                path: '',
                loadChildren: './fleet-inspection-ongoing-list/fleet-inspection-ongoing-list.module#FleetInspectionOngoingListModule',
                resolve: {
                    inspection_list: FleetInspectionOngoingListResolveService,
                    form_list: FleetInspectionFormListResolveService
                }
            },
            {
                path: 'create',
                loadChildren: './fleet-inspection-add/fleet-inspection-add.module#FleetInspectionAddModule',
                data: {
                    name: 'Creat New Inspection'
                },
                resolve: {
                    forms: FleetInspectionFormListResolveService,
                    vehicles: FleetVehicleResolveService,
                    departments: DepartmentListService,
                    employees: EmployeeResolveService
                }
            },
            {
                path: ':inspection_id/details',
                loadChildren: './fleet-inspection-ongoing-details/fleet-inspection-ongoing-details.module#FleetInspectionOngoingDetailsModule',
                data: {
                    name: 'Inspection Details'
                },
                resolve:{
                    data:FleetInspectionOngoingDetailsResolveService
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
    exports: [RouterModule],
    providers: [
        FleetInspectionOngoingListResolveService,
        FleetInspectionFormListResolveService,
        FleetVehicleResolveService,
        EmployeeResolveService,
        FleetInspectionOngoingDetailsResolveService
    ]
})
export class FleetInspectionOngoingRoutingModule {
}
