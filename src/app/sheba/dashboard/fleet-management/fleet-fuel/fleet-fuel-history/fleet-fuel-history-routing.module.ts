import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FleetFuelHistoryComponent} from './fleet-fuel-history.component';

const routes: Routes = [
    {
        path: '',
        component: FleetFuelHistoryComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetFuelHistoryRoutingModule { }
