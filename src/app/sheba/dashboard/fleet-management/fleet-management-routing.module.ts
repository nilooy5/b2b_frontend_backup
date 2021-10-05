import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FleetManagementComponent } from './fleet-management.component';
import { AuthGuard } from '../../../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: FleetManagementComponent,
        children: [
            {
                path: 'vehicle',
                loadChildren: './vehicle/vehicle.module#VehicleModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: false
                }
            },
            {
                path: 'drivers',
                loadChildren: './fleet-driver/fleet-driver.module#FleetDriverModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: false
                }
            },
            {
                path: 'requests',
                loadChildren: './fleet-requests/fleet-requests.module#FleetRequestsModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'assignments',
                loadChildren: './fleet-assignment/fleet-assignment.module#FleetAssignmentModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: false
                }
            },
            {
                path: 'inspection',
                loadChildren: './fleet-inspection/fleet-inspection.module#FleetInspectionModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: false
                }
            },
            {
                path: 'submit-inspection',
                loadChildren: './inspection/inspection.module#InspectionModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: true
                }
            },
            {
                path: 'issue',
                loadChildren: './fleet-issue/fleet-issue.module#FleetIssueModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: false
                }
            },
            {
                path: 'fuel',
                loadChildren: './fleet-fuel/fleet-fuel.module#FleetFuelModule',
                canLoad: [AuthGuard],
                data: {
                    userAccess: false
                }
            },
            {
                path: 'trip-calendar',
                loadChildren: './fleet-assignment/vehicle-assignment-all/vehicle-assignment-all.module#VehicleAssignmentAllModule',
                canLoad: [AuthGuard],
                data: {
                    name: 'Trip Calendar',
                    userAccess: true
                }
            },
            {
                path: '**',
                redirectTo: 'vehicle'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class FleetManagementRoutingModule {
}
