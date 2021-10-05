import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServiceListRoutingModule} from './service-list-routing.module';
import {ServiceListComponent} from './service-list.component';
import {ServiceListItemComponent} from './service-list-item/service-list-item.component';
import {HeadersModule} from '../../../headers/headers.module';
import {ServiceOptionsComponent} from './service-options/service-options.component';
import {MatDialogModule} from '@angular/material';
import {ServiceOptionsModule} from "./service-options/service-options.module";
import {ServiceDetailsModalModule} from '../../../modals/service-details-modal/service-details-modal.module';

@NgModule({
    declarations: [ServiceListComponent, ServiceListItemComponent],
    imports: [
        CommonModule,
        ServiceListRoutingModule,
        HeadersModule,
        ServiceOptionsModule,
        ServiceDetailsModalModule
    ]
})
export class ServiceListModule {
}
