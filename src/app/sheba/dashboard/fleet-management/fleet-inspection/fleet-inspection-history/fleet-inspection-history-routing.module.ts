import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FleetInspectionHistoryComponent} from "./fleet-inspection-history.component";
import {InspectionHistoryDetailsService} from '../../inspection/inspection-history/inspection-history-details.service';
import {FleetInspectionHistoryService} from '../fleet-inspection-history.service';
import {InspectionFormsService} from '../inspection-forms.service';

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionHistoryComponent,
        children: [
            {
                path: '',
                loadChildren: './fleet-inspection-history-list/fleet-inspection-history-list.module#FleetInspectionHistoryListModule',
                resolve: {
                    inspections: FleetInspectionHistoryService,
                    forms: InspectionFormsService
                }
            },
            {
                path: ':inspection_id',
                loadChildren: './fleet-inspection-history-details/fleet-inspection-history-details.module#FleetInspectionHistoryDetailsModule',
                resolve: {
                    inspection: InspectionHistoryDetailsService
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FleetInspectionHistoryRoutingModule {
}
