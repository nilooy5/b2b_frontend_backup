import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionAdditionalComponent} from './subscription-additional.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionAdditionalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionAdditionalRoutingModule { }
