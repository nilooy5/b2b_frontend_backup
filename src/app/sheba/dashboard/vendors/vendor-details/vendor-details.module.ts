import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorDetailsRoutingModule } from './vendor-details-routing.module';
import { VendorDetailsComponent } from './vendor-details.component';

@NgModule({
  declarations: [VendorDetailsComponent],
  imports: [
    CommonModule,
    VendorDetailsRoutingModule
  ]
})
export class VendorDetailsModule { }
