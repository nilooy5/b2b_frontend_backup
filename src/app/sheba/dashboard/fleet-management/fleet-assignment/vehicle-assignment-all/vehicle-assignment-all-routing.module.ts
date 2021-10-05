import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VehicleAssignmentAllComponent} from "./vehicle-assignment-all.component";

const routes: Routes = [
    {
        path: '',
        component: VehicleAssignmentAllComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VehicleAssignmentAllRoutingModule {
}
