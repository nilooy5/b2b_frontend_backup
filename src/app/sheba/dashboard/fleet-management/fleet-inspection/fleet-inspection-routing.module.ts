import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionComponent} from "./fleet-inspection.component";
const routes: Routes = [
    {
        path: '',
        component: FleetInspectionComponent,
        children: [
            {
                path: 'ongoing',
                loadChildren: './fleet-inspection-ongoing/fleet-inspection-ongoing.module#FleetInspectionOngoingModule',
                data: {
                    name: 'Ongoing Inspection',
                    action: {
                        actionButtonText: 'Create New Inspection',
                        path: './ongoing/create',
                    }
                }
            },
            {
                path: 'forms',
                loadChildren: './fleet-inspection-form/fleet-inspection-form.module#FleetInspectionFormModule',
                data: {
                    name: 'Inspection Form',
                    action: {
                        actionButtonText: 'Create New Form',
                        path: './forms/add'
                    }
                }
            },
            {
                path: 'history',
                loadChildren: './fleet-inspection-history/fleet-inspection-history.module#FleetInspectionHistoryModule',
                data: {
                    name: 'Inspection History'
                }
            },
            {
                path: 'failed-item',
                loadChildren: './fleet-inspection-failed-item/fleet-inspection-failed-item.module#FleetInspectionFailedItemModule',
                data: {
                    name: 'Failed Items'
                }
            },
            {
                path: '**',
                redirectTo: 'ongoing'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionRoutingModule {
}
