import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionOngoingListComponent} from "./fleet-inspection-ongoing-list.component";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionOngoingListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionOngoingListRoutingModule {
}
