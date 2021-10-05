import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorDetailsCompanyInfoRoutingModule } from './vendor-details-company-info-routing.module';
import { VendorDetailsCompanyInfoComponent } from './vendor-details-company-info.component';

@NgModule({
  declarations: [VendorDetailsCompanyInfoComponent],
  imports: [
    CommonModule,
    VendorDetailsCompanyInfoRoutingModule
  ]
})
export class VendorDetailsCompanyInfoModule { }
