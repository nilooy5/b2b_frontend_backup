import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionFormDetailsRunningInspectionsComponent} from "./fleet-inspection-form-details-running-inspections.component";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionFormDetailsRunningInspectionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionFormDetailsRunningInspectionsRoutingModule {
}
