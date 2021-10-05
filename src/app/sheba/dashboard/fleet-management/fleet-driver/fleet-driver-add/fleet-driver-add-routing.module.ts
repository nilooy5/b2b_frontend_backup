import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetDriverAddComponent} from "./fleet-driver-add.component";

const routes: Routes = [
    {
        path: '',
        component: FleetDriverAddComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetDriverAddRoutingModule {
}
