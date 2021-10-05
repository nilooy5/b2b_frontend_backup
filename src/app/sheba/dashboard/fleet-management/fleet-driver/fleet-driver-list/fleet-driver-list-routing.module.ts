import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetDriverListComponent} from "./fleet-driver-list.component";

const routes: Routes = [
    {
        path: '',
        component: FleetDriverListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetDriverListRoutingModule {
}
