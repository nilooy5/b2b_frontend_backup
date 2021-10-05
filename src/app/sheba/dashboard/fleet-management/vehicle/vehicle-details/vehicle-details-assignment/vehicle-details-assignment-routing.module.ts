import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehicleDetailsAssignmentComponent} from './vehicle-details-assignment.component';

const routes: Routes = [
    {
        path: '',
        component: VehicleDetailsAssignmentComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleDetailsAssignmentRoutingModule { }
