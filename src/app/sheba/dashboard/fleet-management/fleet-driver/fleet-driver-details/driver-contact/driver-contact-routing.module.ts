import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriverContactComponent} from './driver-contact.component';

const routes: Routes = [
    {
        path: '',
        component: DriverContactComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverContactRoutingModule { }
