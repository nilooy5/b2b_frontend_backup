import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionFormListComponent} from "./fleet-inspection-form-list.component";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionFormListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionFormListRoutingModule {
}
