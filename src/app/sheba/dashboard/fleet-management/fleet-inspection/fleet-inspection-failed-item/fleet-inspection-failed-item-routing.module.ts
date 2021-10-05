import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionFailedItemComponent} from "./fleet-inspection-failed-item.component";
import {FleetInspectionFailedItemResolveService} from "./fleet-inspection-failed-item-resolve.service";
import {FleetInspectionFormListResolveService} from "../fleet-inspection-form/fleet-inspection-form-resolve-services";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionFailedItemComponent,
        children: [
            {
                path: '',
                loadChildren: './fleet-inspection-failed-item-list/fleet-inspection-failed-item-list.module#FleetInspectionFailedItemListModule',
                resolve: {
                    data: FleetInspectionFailedItemResolveService,
                    forms: FleetInspectionFormListResolveService
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [FleetInspectionFailedItemResolveService, FleetInspectionFormListResolveService]
})
export class FleetInspectionFailedItemRoutingModule {
}
