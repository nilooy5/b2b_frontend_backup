import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetRequestAddComponent} from "./fleet-request-add.component";
import {FleetRequestSuccessComponent} from "./fleet-request-success/fleet-request-success.component";

const routes: Routes = [
    {
        path: '',
        component: FleetRequestAddComponent
    },
    {
        path: 'success',
        component: FleetRequestSuccessComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetRequestAddRoutingModule {
}
