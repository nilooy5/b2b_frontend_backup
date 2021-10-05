import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehicleListRoutingModule} from './vehicle-list-routing.module';
import {VehicleListComponent} from './vehicle-list.component';
import {VehicleListFilterComponent} from './vehicle-list-filter/vehicle-list-filter.component';
import {MatMenuModule, MatTableModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';
import {BulkUploadModalModule} from "../../../../../modules/bulk-upload-modal/bulk-upload-modal.module";
import {ConfirmationModalModule} from "../../../../modals/confirmation-modal/confirmation-modal.module";

@NgModule({
    declarations: [VehicleListComponent, VehicleListFilterComponent],
    imports: [
        CommonModule,
        VehicleListRoutingModule,
        MatTableModule,
        MatMenuModule,
        BulkUploadModalModule,
        FormsModule,
        LazyLoadImageModule.forRoot({}),
        ShebaWidgetsModule,
        ConfirmationModalModule
    ]
})
export class VehicleListModule {
}
