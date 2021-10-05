import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriverLicenseInfoComponent} from './driver-license-info.component';

const routes: Routes = [
    {
        path: '',
        component: DriverLicenseInfoComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverLicenseInfoRoutingModule { }
