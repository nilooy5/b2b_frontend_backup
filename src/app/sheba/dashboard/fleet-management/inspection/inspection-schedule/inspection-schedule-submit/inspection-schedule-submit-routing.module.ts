import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InspectionScheduleSubmitComponent} from './inspection-schedule-submit.component';

const routes: Routes = [
    {
        path: '',
        component: InspectionScheduleSubmitComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionScheduleSubmitRoutingModule { }
