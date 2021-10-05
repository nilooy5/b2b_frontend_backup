import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriverVehicleComponent} from './driver-vehicle.component';

const routes: Routes = [
    {
        path: '',
        component: DriverVehicleComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverVehicleRoutingModule { }
