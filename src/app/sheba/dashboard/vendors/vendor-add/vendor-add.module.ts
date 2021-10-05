import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorAddRoutingModule } from './vendor-add-routing.module';
import {VendorAddComponent} from "./vendor-add.component";
import {VehicleAddRoutingModule} from "../../fleet-management/vehicle/vehicle-add/vehicle-add-routing.module";
import {
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule, MatRadioModule, MatSelectModule,
    MatStepperModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShebaWidgetsModule} from "../../../../modules/sheba-widgets/sheba-widgets.module";
import {ConfirmMessageModule} from "../../fleet-management/confirm-message/confirm-message.module";
import {SelectPickerWithSearchModule} from "../../../../modules/select-picker-with-search/select-picker-with-search.module";
import {FormTemplateSelectSearchModule} from "../../fleet-management/form-template-select-search/form-template-select-search.module";

@NgModule({
  declarations: [
      VendorAddComponent
  ],
  imports: [
    CommonModule,
    VendorAddRoutingModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
     MatInputModule,
    ReactiveFormsModule,
    ShebaWidgetsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ConfirmMessageModule,
    SelectPickerWithSearchModule,
    MatButtonModule,
    MatRadioModule,
    FormTemplateSelectSearchModule
  ],
   providers: [
    MatDatepickerModule,
   ],
})
export class VendorAddModule { }
