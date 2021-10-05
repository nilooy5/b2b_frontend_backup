import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetRequestAddRoutingModule } from './fleet-request-add-routing.module';
import { FleetRequestAddComponent } from './fleet-request-add.component';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule} from "@angular/material";
import {ShebaPipesModule} from "../../../../../pipes/sheba-pipes/sheba-pipes.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FleetRequestSuccessComponent } from './fleet-request-success/fleet-request-success.component';

@NgModule({
  declarations: [FleetRequestAddComponent, FleetRequestSuccessComponent],
  imports: [
    CommonModule,
    FleetRequestAddRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatIconModule,
    ShebaPipesModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class FleetRequestAddModule { }
