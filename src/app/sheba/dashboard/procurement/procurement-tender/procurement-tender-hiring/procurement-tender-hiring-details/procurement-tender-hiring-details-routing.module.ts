import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementTenderHiringDetailsComponent } from './procurement-tender-hiring-details.component';
import { ProcurementBidDetailsService } from '../../procurement-tender-detail/procurement-bid-details.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderHiringDetailsComponent,
        resolve: {
            bidDetails: ProcurementBidDetailsService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementTenderHiringDetailsRoutingModule { }
