import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetInspectionOngoingDetailsGeneralComponent} from './fleet-inspection-ongoing-details-general.component';

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionOngoingDetailsGeneralComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetInspectionOngoingDetailsGeneralRoutingModule { }
