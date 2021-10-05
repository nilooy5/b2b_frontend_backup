import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetInspectionHistoryListComponent} from './fleet-inspection-history-list.component';

const routes: Routes = [
    {
        path: '',
        component: FleetInspectionHistoryListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetInspectionHistoryListRoutingModule { }
