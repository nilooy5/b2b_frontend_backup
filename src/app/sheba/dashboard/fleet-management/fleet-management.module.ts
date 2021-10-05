import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetManagementRoutingModule } from './fleet-management-routing.module';
import { FleetManagementComponent } from './fleet-management.component';

@NgModule({
    declarations: [
        FleetManagementComponent
    ],
    imports: [
        CommonModule,
        FleetManagementRoutingModule
    ]
})
export class FleetManagementModule { }
