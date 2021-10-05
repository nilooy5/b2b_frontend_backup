import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriverExperienceComponent} from './driver-experience.component';

const routes: Routes = [
    {
        path: '',
        component: DriverExperienceComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverExperienceRoutingModule { }
