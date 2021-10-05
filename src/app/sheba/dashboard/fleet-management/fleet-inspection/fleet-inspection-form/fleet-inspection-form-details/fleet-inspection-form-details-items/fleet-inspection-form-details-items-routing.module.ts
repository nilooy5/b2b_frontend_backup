import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionFormDetailsItemsComponent} from "./fleet-inspection-form-details-items.component";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionFormDetailsItemsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionFormDetailsItemsRoutingModule {
}
