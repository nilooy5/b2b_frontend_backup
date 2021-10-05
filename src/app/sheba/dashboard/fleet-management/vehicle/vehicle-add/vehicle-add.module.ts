import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VehicleAddRoutingModule} from './vehicle-add-routing.module';
import {VehicleAddComponent} from './vehicle-add.component';
import {
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule, MatRadioModule,
    MatSelectModule,
    MatStepperModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';
import {ConfirmMessageModule} from '../../confirm-message/confirm-message.module';
import {SelectPickerWithSearchModule} from '../../../../../modules/select-picker-with-search/select-picker-with-search.module';
import {FormTemplateSelectSearchModule} from "../../form-template-select-search/form-template-select-search.module";

@NgModule({
    declarations: [VehicleAddComponent],
    imports: [
        CommonModule,
        VehicleAddRoutingModule,
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
export class VehicleAddModule {
}
