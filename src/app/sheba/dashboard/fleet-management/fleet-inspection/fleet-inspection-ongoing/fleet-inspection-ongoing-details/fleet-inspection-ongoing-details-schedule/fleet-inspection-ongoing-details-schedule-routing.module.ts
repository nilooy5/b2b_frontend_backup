import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetInspectionOngoingDetailsScheduleComponent} from './fleet-inspection-ongoing-details-schedule.component';

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionOngoingDetailsScheduleComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetInspectionOngoingDetailsScheduleRoutingModule { }
