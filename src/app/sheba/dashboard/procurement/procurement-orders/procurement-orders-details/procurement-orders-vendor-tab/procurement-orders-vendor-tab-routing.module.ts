import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcurementOrdersVendorTabComponent } from './procurement-orders-vendor-tab.component';
import { ProcurementOrdersVendorInfoService } from '../procurement-orders-vendor-info.service';

const routes: Routes = [
    {
        path: '',
        component: ProcurementOrdersVendorTabComponent,
        resolve: {
            vendorInformation: ProcurementOrdersVendorInfoService
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProcurementOrdersVendorTabRoutingModule { }
