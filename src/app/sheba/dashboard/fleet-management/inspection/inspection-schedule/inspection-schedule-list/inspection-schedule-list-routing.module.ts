import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InspectionScheduleListComponent} from './inspection-schedule-list.component';

const routes: Routes = [
    {
        path: '',
        component: InspectionScheduleListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionScheduleListRoutingModule { }
