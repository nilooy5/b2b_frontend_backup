import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InspectionHistoryComponent} from './inspection-history.component';
import {InspectionHistoryListService} from './inspection-history-list.service';
import {InspectionHistoryDetailsService} from './inspection-history-details.service';
import {InspectionFormsService} from '../../fleet-inspection/inspection-forms.service';

const routes: Routes = [
    {
        path: '',
        component: InspectionHistoryComponent,
        children: [
            {
                path: '',
                loadChildren: './inspection-history-list/inspection-history-list.module#InspectionHistoryListModule',
                resolve: {
                    histories: InspectionHistoryListService,
                    forms: InspectionFormsService
                },
            },
            {
                path: ':inspection_id',
                loadChildren: './inspection-history-details/inspection-history-details.module#InspectionHistoryDetailsModule',
                resolve: {
                    inspection: InspectionHistoryDetailsService
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InspectionHistoryRoutingModule { }
