import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderListComponent} from './procurement-tender-list.component';
import {ProcurementTenderListService} from '../procurement-tender-list.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderListComponent,
        resolve: {
            procurementTenderLists: ProcurementTenderListService,
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcurementTenderListRoutingModule { }
