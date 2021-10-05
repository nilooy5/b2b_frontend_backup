import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionOptionsComponent} from './subscription-options.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionOptionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionOptionsRoutingModule { }
