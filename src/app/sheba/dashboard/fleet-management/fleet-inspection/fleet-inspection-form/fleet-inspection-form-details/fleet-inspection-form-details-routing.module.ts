import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionFormDetailsComponent} from "./fleet-inspection-form-details.component";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionFormDetailsComponent,
        children: [
            {
                path: 'general',
                loadChildren: './fleet-inspection-form-details-general/fleet-inspection-form-details-general.module#FleetInspectionFormDetailsGeneralModule'
            },
            {
                path: 'items',
                loadChildren: './fleet-inspection-form-details-items/fleet-inspection-form-details-items.module#FleetInspectionFormDetailsItemsModule'
            },
            {
                path: 'running-inspections',
                loadChildren: './fleet-inspection-form-details-running-inspections/fleet-inspection-form-details-running-inspections.module#FleetInspectionFormDetailsRunningInspectionsModule'
            },
            {
                path: '**',
                redirectTo: 'general'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionFormDetailsRoutingModule {
}
