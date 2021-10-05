import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DriverImageEditComponent} from './driver-image-edit.component';

const routes: Routes = [
    {
        path: '',
        component: DriverImageEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DriverImageEditRoutingModule { }
