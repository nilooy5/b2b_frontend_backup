import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VehicleHistoryComponent} from './vehicle-history.component';

const routes: Routes = [
    {
        path: '',
        component: VehicleHistoryComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleHistoryRoutingModule { }
