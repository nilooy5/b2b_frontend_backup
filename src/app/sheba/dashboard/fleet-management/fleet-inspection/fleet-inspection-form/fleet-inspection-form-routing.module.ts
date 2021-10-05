import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionFormComponent} from "./fleet-inspection-form.component";
import {
    FleetInspectionFormDetailsResolveService,
    FleetInspectionFormListResolveService
} from "./fleet-inspection-form-resolve-services";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionFormComponent,
        children: [
            {
                path: '',
                loadChildren: './fleet-inspection-form-list/fleet-inspection-form-list.module#FleetInspectionFormListModule',
                resolve: {
                    formList: FleetInspectionFormListResolveService
                }
            },
            {
                path: 'add',
                loadChildren: './fleet-inspection-form-add/fleet-inspection-form-add.module#FleetInspectionFormAddModule'
            },
            {
                path: ':form_id/details',
                loadChildren: './fleet-inspection-form-details/fleet-inspection-form-details.module#FleetInspectionFormDetailsModule',
                resolve: {
                    template: FleetInspectionFormDetailsResolveService
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        FleetInspectionFormListResolveService,
        FleetInspectionFormDetailsResolveService
    ]
})
export class FleetInspectionFormRoutingModule {
}
