import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SubscriptionOrderListService} from '../subscription-order-list.service';
import {SubscriptionOrderListComponent} from './subscription-order-list.component';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionOrderListComponent,
        resolve: {
            subscriptionOrderLists: SubscriptionOrderListService,
        }
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionOrderListRoutingModule {
}
