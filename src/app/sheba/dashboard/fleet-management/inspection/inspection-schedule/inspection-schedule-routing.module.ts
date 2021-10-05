import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InspectionScheduleComponent} from './inspection-schedule.component';
import {InspectionScheduleListService} from './inspection-schedule-list.service';
import {InspectionHistoryDetailsService} from '../inspection-history/inspection-history-details.service';
import {InspectionFormsService} from '../../fleet-inspection/inspection-forms.service';

const routes: Routes = [
    {
        path: '',
        component: InspectionScheduleComponent,
        children: [
            {
                path: '',
                loadChildren: './inspection-schedule-list/inspection-schedule-list.module#InspectionScheduleListModule',
                resolve: {
                    inspections: InspectionScheduleListService,
                    forms: InspectionFormsService
                }
            },
            {
                path: 'submit/:inspection_id',
                loadChildren: './inspection-schedule-submit/inspection-schedule-submit.module#InspectionScheduleSubmitModule',
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
export class InspectionScheduleRoutingModule { }
