import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FleetRequestListRoutingModule} from './fleet-request-list-routing.module';
import {FleetRequestListComponent} from './fleet-request-list.component';
import {FormsModule} from '@angular/forms';
import {MatTableModule, MatTabsModule} from '@angular/material';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';
import {FleetRequestListFilterModule} from './fleet-request-list-filter/fleet-request-list-filter.module';

@NgModule({
    declarations: [FleetRequestListComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatTableModule,
        FleetRequestListRoutingModule,
        LazyLoadImageModule.forRoot({}),
        ShebaWidgetsModule,
        FleetRequestListFilterModule,
        MatTabsModule
    ],
})
export class FleetRequestListModule {
}
