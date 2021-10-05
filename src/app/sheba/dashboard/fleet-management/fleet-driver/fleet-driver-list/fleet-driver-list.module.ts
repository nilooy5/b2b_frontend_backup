import {NgModule, Optional} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FleetDriverListRoutingModule} from './fleet-driver-list-routing.module';
import {FleetDriverListComponent} from './fleet-driver-list.component';
import {MatMenuModule, MatTableModule} from "@angular/material";
import {LazyLoadImageModule} from "ng-lazyload-image";
import {FleetDriverListFilterComponent} from './fleet-driver-list-filter/fleet-driver-list-filter.component';
import {FormsModule} from "@angular/forms";
import {ShebaWidgetsModule} from "../../../../../modules/sheba-widgets/sheba-widgets.module";
import {BulkUploadModalModule} from '../../../../../modules/bulk-upload-modal/bulk-upload-modal.module';
import {ConfirmationModalModule} from "../../../../modals/confirmation-modal/confirmation-modal.module";

@NgModule({
    declarations: [FleetDriverListComponent, FleetDriverListFilterComponent],
    imports: [
        CommonModule,
        FleetDriverListRoutingModule,
        MatTableModule,
        MatMenuModule,
        ConfirmationModalModule,
        FormsModule,
        LazyLoadImageModule.forRoot({}),
        ShebaWidgetsModule,
        BulkUploadModalModule
    ]
})

export class FleetDriverListModule {
}
