import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeatureLandingComponent} from './feature-landing.component';

const routes: Routes = [
    {
        path: '',
        component: FeatureLandingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureLandingRoutingModule { }
