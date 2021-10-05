import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetFuelHistoryRoutingModule } from './fleet-fuel-history-routing.module';
import {FleetFuelHistoryComponent} from './fleet-fuel-history.component';
import {MatTableModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {FleetFuelHistoryFilterModule} from './fleet-fuel-history-filter/fleet-fuel-history-filter.module';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';

@NgModule({
    declarations: [
        FleetFuelHistoryComponent
    ],
    imports: [
        CommonModule,
        FleetFuelHistoryRoutingModule,
        MatTableModule,
        FormsModule,
        FleetFuelHistoryFilterModule,
        ShebaWidgetsModule
    ]
})
export class FleetFuelHistoryModule { }
