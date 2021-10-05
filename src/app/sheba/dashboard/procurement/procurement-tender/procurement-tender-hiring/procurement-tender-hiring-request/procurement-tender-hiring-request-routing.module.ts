import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementTenderHiringRequestComponent } from './procurement-tender-hiring-request.component';
import { ProcurementBidDetailsService } from '../../procurement-tender-detail/procurement-bid-details.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderHiringRequestComponent,
        resolve: {
            bidDetails: ProcurementBidDetailsService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementTenderHiringRequestRoutingModule { }
