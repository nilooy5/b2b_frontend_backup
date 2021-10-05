import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetRequestListComponent} from './fleet-request-list.component';

const routes: Routes = [
    {
        path: '',
        component: FleetRequestListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetRequestListRoutingModule {
}
