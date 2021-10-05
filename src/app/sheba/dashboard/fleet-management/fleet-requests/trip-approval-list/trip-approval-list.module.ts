import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripApprovalListRoutingModule } from './trip-approval-list-routing.module';
import {TripApprovalListComponent} from './trip-approval-list.component';
import {FleetRequestListFilterModule} from '../fleet-request-list/fleet-request-list-filter/fleet-request-list-filter.module';
import {FormsModule} from '@angular/forms';
import {MatSelectModule, MatTableModule, MatTabsModule} from '@angular/material';
import {FleetRequestListRoutingModule} from '../fleet-request-list/fleet-request-list-routing.module';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';
import { TripApprovalListFilterComponent } from './trip-approval-list-filter/trip-approval-list-filter.component';
import {ShebaPipesModule} from '../../../../../pipes/sheba-pipes/sheba-pipes.module';

@NgModule({
    declarations: [
        TripApprovalListComponent,
        TripApprovalListFilterComponent
    ],
    imports: [
        CommonModule,
        TripApprovalListRoutingModule,
        FormsModule,
        MatTableModule,
        LazyLoadImageModule.forRoot({}),
        ShebaWidgetsModule,
        FleetRequestListFilterModule,
        MatTabsModule,
        ShebaPipesModule,
        MatSelectModule
    ]
})
export class TripApprovalListModule { }
