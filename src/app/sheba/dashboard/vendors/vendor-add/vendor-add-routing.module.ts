import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VendorAddComponent} from "./vendor-add.component";

const routes: Routes = [
    {
        path: '',
        component: VendorAddComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorAddRoutingModule { }
