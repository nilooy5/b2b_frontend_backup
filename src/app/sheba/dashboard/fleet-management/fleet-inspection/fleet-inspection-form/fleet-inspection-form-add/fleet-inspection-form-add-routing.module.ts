import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionFormAddComponent} from "./fleet-inspection-form-add.component";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionFormAddComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionFormAddRoutingModule {
}
