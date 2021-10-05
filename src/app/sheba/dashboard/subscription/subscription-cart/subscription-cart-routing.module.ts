import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SubscriptionCartComponent} from './subscription-cart.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionCartComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionCartRoutingModule { }
