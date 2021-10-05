import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InspectionHistoryListComponent} from './inspection-history-list.component';

const routes: Routes = [
    {
        path: '',
        component: InspectionHistoryListComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionHistoryListRoutingModule { }
