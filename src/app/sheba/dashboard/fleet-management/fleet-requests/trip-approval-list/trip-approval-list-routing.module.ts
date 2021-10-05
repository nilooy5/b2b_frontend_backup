import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TripApprovalListComponent} from './trip-approval-list.component';

const routes: Routes = [
    {
        path: '',
        component: TripApprovalListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TripApprovalListRoutingModule { }
