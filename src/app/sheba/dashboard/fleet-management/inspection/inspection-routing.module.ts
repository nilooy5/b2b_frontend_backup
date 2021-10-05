import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InspectionComponent} from './inspection.component';

const routes: Routes = [
    {
        path: '',
        component: InspectionComponent,
        children: [
            {
                path: 'history',
                loadChildren: './inspection-history/inspection-history.module#InspectionHistoryModule',
                data: {
                    name: 'Inspection History'
                }
            },
            {
                path: 'schedule',
                loadChildren: './inspection-schedule/inspection-schedule.module#InspectionScheduleModule',
                data: {
                    name: 'Scheduled Inspection'
                }
            },
            {
                path: '**',
                redirectTo: 'schedule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InspectionRoutingModule {
}
