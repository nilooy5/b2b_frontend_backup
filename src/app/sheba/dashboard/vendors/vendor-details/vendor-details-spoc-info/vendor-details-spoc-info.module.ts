import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorDetailsSpocInfoRoutingModule } from './vendor-details-spoc-info-routing.module';
import {VendorDetailsSpocInfoComponent} from './vendor-details-spoc-info.component';

@NgModule({
  declarations: [
      VendorDetailsSpocInfoComponent
  ],
  imports: [
    CommonModule,
    VendorDetailsSpocInfoRoutingModule
  ]
})
export class VendorDetailsSpocInfoModule { }
