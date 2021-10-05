import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionTimeComponent} from './subscription-time.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionTimeComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionTimeRoutingModule { }
