import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionAddComponent} from "./fleet-inspection-add.component";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionAddComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionAddRoutingModule {
}
