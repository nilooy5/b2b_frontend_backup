import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetInspectionHistoryDetailsComponent} from './fleet-inspection-history-details.component';

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionHistoryDetailsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetInspectionHistoryDetailsRoutingModule { }
