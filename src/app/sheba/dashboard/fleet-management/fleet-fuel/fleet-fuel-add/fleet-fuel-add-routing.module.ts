import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetFuelAddComponent} from './fleet-fuel-add.component';

const routes: Routes = [
    {
        path: '',
        component: FleetFuelAddComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetFuelAddRoutingModule { }
