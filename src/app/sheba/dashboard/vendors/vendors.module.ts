import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VendorsRoutingModule} from './vendors-routing.module';
import {VendorsComponent} from './vendors.component';
// import {ConfirmationModalModule} from "../../modals/confirmation-modal/confirmation-modal.module";
// import {BulkUploadModalModule} from "../../../modules/bulk-upload-modal/bulk-upload-modal.module";
@NgModule({
    declarations: [VendorsComponent],
    imports: [
        CommonModule,
        VendorsRoutingModule
    ]
})
export class VendorsModule {
}
