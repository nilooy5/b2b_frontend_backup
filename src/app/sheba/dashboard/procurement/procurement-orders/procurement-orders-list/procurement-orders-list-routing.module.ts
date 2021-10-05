import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementOrdersListComponent } from './procurement-orders-list.component';
import { ProcurementOrdersListService } from '../procurement-orders-list.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementOrdersListComponent,
        resolve: {
            procurementOrdersList: ProcurementOrdersListService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementOrdersListRoutingModule { }
