import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorListRoutingModule } from './vendor-list-routing.module';
import { VendorListComponent } from './vendor-list.component';
import {MatMenuModule, MatTableModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {ShebaWidgetsModule} from "../../../../modules/sheba-widgets/sheba-widgets.module";
import {ConfirmationModalModule} from "../../../modals/confirmation-modal/confirmation-modal.module";
import {BulkUploadModalModule} from "../../../../modules/bulk-upload-modal/bulk-upload-modal.module";

@NgModule({
  declarations: [VendorListComponent],
    imports: [
        CommonModule,
        MatTableModule,
        MatMenuModule,
        FormsModule,
        VendorListRoutingModule,
        LazyLoadImageModule.forRoot({}),
        ShebaWidgetsModule,
        ConfirmationModalModule,
        BulkUploadModalModule
    ]
})
export class VendorListModule { }
