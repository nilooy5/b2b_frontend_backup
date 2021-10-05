import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetRequestDetailsComponent} from "./fleet-request-details.component";

const routes: Routes = [
    {
        path: '',
        component: FleetRequestDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetRequestDetailsRoutingModule {
}
