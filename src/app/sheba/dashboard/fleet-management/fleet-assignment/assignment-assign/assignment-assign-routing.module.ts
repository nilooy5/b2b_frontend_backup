import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AssignmentAssignComponent} from "./assignment-assign.component";
import {FleetVehicleResolveService} from "../fleet-assignment.service";
import {FleetDriverResolveService} from "../../../../../services/fleet.service";

const routes: Routes = [
    {
        path: '',
        component: AssignmentAssignComponent,
        resolve: {
            vehicles: FleetVehicleResolveService,
            drivers: FleetDriverResolveService,
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssignmentAssignRoutingModule {
}
