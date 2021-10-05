import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionOngoingDetailsComponent} from "./fleet-inspection-ongoing-details.component";
import {FleetInspectionOngoingDetailsHistoryService} from './fleet-inspection-ongoing-details-history.service';
import {FleetInspectionOngoingDetailsScheduleService} from './fleet-inspection-ongoing-details-schedule.service';

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionOngoingDetailsComponent,
        children: [
            {
                path: 'general',
                loadChildren: './fleet-inspection-ongoing-details-general/fleet-inspection-ongoing-details-general.module#FleetInspectionOngoingDetailsGeneralModule'
            },
            {
                path: 'schedule',
                loadChildren: './fleet-inspection-ongoing-details-schedule/fleet-inspection-ongoing-details-schedule.module#FleetInspectionOngoingDetailsScheduleModule',
                resolve: {
                    inspections: FleetInspectionOngoingDetailsScheduleService
                }
            },
            {
                path: 'history',
                loadChildren: './fleet-inspection-ongoing-details-history/fleet-inspection-ongoing-details-history.module#FleetInspectionOngoingDetailsHistoryModule',
                resolve: {
                    inspections: FleetInspectionOngoingDetailsHistoryService
                }
            },
            {
                path: 'items',
                loadChildren: './fleet-inspection-ongoing-details-items/fleet-inspection-ongoing-details-items.module#FleetInspectionOngoingDetailsItemsModule'
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
export class FleetInspectionOngoingDetailsRoutingModule {
}
