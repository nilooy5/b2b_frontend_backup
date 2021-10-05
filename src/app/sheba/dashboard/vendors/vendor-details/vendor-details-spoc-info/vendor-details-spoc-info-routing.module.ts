import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VendorDetailsSpocInfoComponent} from './vendor-details-spoc-info.component';

const routes: Routes = [
    {
        path: '',
        component: VendorDetailsSpocInfoComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorDetailsSpocInfoRoutingModule { }
