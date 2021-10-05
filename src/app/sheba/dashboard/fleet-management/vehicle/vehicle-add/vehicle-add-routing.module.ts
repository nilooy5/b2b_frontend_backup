import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehicleAddComponent} from './vehicle-add.component';

const routes: Routes = [
    {
        path: '',
        component: VehicleAddComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleAddRoutingModule { }
