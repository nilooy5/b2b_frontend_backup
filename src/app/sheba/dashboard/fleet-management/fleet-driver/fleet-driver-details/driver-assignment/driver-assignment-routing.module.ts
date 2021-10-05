import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriverAssignmentComponent} from './driver-assignment.component';

const routes: Routes = [
    {
        path: '',
        component: DriverAssignmentComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverAssignmentRoutingModule { }
