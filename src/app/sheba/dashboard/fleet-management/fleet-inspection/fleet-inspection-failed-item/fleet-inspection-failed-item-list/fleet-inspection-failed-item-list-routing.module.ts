import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionFailedItemListComponent} from "./fleet-inspection-failed-item-list.component";

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionFailedItemListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionFailedItemListRoutingModule {
}
