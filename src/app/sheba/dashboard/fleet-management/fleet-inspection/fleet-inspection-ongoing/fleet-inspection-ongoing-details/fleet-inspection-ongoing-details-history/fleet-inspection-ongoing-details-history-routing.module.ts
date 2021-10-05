import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetInspectionOngoingDetailsHistoryComponent} from './fleet-inspection-ongoing-details-history.component';

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionOngoingDetailsHistoryComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetInspectionOngoingDetailsHistoryRoutingModule { }
