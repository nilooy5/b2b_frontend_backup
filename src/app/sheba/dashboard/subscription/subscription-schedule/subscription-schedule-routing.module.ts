import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionScheduleComponent} from './subscription-schedule.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionScheduleComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionScheduleRoutingModule { }
