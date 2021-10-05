import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementOrdersWorkorderTabComponent} from './procurement-orders-workorder-tab.component';
import {ProcurementWorkorderDetailsResolverService} from './procurement-workorder-details-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementOrdersWorkorderTabComponent,
        resolve: {
            procurementWorkorderDetailsResolver: ProcurementWorkorderDetailsResolverService
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementOrdersWorkorderTabRoutingModule { }
