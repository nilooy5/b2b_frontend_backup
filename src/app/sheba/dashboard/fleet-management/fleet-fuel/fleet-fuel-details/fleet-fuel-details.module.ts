import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetFuelDetailsRoutingModule } from './fleet-fuel-details-routing.module';
import {FleetFuelDetailsComponent} from './fleet-fuel-details.component';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';
import {CommentsModule} from '../../../../../modules/comments/comments.module';
import {VehicleSummaryCardModule} from '../../fleet-common-modules/vehicle-summary-card/vehicle-summary-card.module';

@NgModule({
    declarations: [
        FleetFuelDetailsComponent
    ],
    imports: [
        CommonModule,
        FleetFuelDetailsRoutingModule,
        ShebaWidgetsModule,
        CommentsModule,
        VehicleSummaryCardModule
    ]
})
export class FleetFuelDetailsModule { }
