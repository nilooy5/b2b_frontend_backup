import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetAssignmentComponent} from "./fleet-assignment.component";
import {
    FleetAssignmentDetailsResolveService,
    FleetAssignmentService, FleetTripRequestDetailsResolveService,
    FleetUserResolveService,
    FleetVehicleResolveService
} from "./fleet-assignment.service";

const routes: Routes = [
    {
        path: '',
        component: FleetAssignmentComponent,
        children: [
            {
                path: '',
                loadChildren: './assignment-list/assignment-list.module#AssignmentListModule',
                data: {
                    name: 'Assignment List'
                },
                resolve: {
                    assignments: FleetAssignmentService
                }
            },
            {
                path: 'add',
                loadChildren: './assignment-add/assignment-add.module#AssignmentAddModule',
                data: {
                    name: 'Assign Vehicle'
                },
                resolve: {
                    members: FleetUserResolveService,
                    vehicles: FleetVehicleResolveService
                }
            },
            {
                path: 'all',
                loadChildren: './vehicle-assignment-all/vehicle-assignment-all.module#VehicleAssignmentAllModule',
                data: {
                    name: 'Assignment Schedule'
                }
            },
            {
                path: ':request_id/details',
                loadChildren: './assignment-details/assignment-details.module#AssignmentDetailsModule',
                data: {
                    name: 'Assignment Detail'
                },
                resolve: {
                    details: FleetAssignmentDetailsResolveService
                }
            },
            {
                path: ':request_id/assign',
                loadChildren: './assignment-assign/assignment-assign.module#AssignmentAssignModule',
                data: {
                    name: 'Assign Vehicle'
                },
                resolve: {
                    tripRequest: FleetTripRequestDetailsResolveService
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
export class FleetAssignmentRoutingModule {
}
