import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionFormDetailsGeneralComponent} from "./fleet-inspection-form-details-general.component";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionFormDetailsGeneralComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionFormDetailsGeneralRoutingModule {
}
