import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetRequestsComponent} from "./fleet-requests.component";
import {FleetRequestDetailsResolveService, FleetRequestsResolveService} from "./fleet-request.service";
import {FleetVehicleResolveService} from "../fleet-assignment/fleet-assignment.service";
import {TripApprovalListService} from './trip-approval-list.service';

const routes: Routes = [
    {
        path: '',
        component: FleetRequestsComponent,
        children: [
            {
                path: '',
                loadChildren: './fleet-request-list/fleet-request-list.module#FleetRequestListModule',
                resolve: {
                    requests: FleetRequestsResolveService
                },
                data: {
                    name: 'Request List'
                }
            },
            {
                path: 'approvals',
                loadChildren: './trip-approval-list/trip-approval-list.module#TripApprovalListModule',
                resolve: {
                    requests: TripApprovalListService
                },
                data: {
                    name: 'My Approvals'
                }
            },
            {
                path: 'add',
                loadChildren: './fleet-request-add/fleet-request-add.module#FleetRequestAddModule',
                resolve: {
                    vehicles: FleetVehicleResolveService
                }
            },
            {
                path: ':request_id/details',
                loadChildren: './fleet-request-details/fleet-request-details.module#FleetRequestDetailsModule',
                resolve: {
                    details: FleetRequestDetailsResolveService
                },
                data: {
                    name: 'Request Detail'
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
export class FleetRequestsRoutingModule {
}
