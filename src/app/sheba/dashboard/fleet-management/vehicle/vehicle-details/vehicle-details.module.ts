import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDetailsRoutingModule } from './vehicle-details-routing.module';
import {VehicleDetailsComponent} from './vehicle-details.component';
import {VehicleCardModule} from './vehicle-card/vehicle-card.module';

@NgModule({
    declarations: [VehicleDetailsComponent],
    imports: [
        CommonModule,
        VehicleDetailsRoutingModule,
        VehicleCardModule,
    ]
})
export class VehicleDetailsModule { }
