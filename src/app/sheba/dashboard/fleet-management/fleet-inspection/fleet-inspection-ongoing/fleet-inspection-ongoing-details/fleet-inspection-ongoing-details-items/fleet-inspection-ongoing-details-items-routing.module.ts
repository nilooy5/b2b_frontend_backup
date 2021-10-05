import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionOngoingDetailsItemsComponent} from "./fleet-inspection-ongoing-details-items.component";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionOngoingDetailsItemsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionOngoingDetailsItemsRoutingModule {
}
