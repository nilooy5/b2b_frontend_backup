import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InspectionHistoryDetailsComponent} from './inspection-history-details.component';

const routes: Routes = [
    {
        path: '',
        component: InspectionHistoryDetailsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionHistoryDetailsRoutingModule { }
