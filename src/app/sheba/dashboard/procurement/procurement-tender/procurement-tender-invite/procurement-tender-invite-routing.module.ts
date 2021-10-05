import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProcurementTenderInviteComponent} from './procurement-tender-invite.component';
import {VendorService} from '../../../../../services/vendor.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementTenderInviteComponent,
        resolve: {
            vendors: VendorService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcurementTenderInviteRoutingModule { }
