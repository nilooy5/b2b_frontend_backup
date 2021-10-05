import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementOrdersTimelineTabComponent } from './procurement-orders-timeline-tab.component';
import { ProcurementOrdersTimelineService } from '../procurement-orders-timeline.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementOrdersTimelineTabComponent,
        resolve: {
            timelines: ProcurementOrdersTimelineService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementOrdersTimelineTabRoutingModule { }
