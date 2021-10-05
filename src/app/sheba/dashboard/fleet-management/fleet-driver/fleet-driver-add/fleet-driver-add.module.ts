import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetDriverAddRoutingModule } from './fleet-driver-add-routing.module';
import { FleetDriverAddComponent } from './fleet-driver-add.component';

import {
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule, MatRadioModule,
    MatSelectModule,
    MatStepperModule,
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';
import {ConfirmMessageModule} from '../../confirm-message/confirm-message.module';
import {SelectPickerWithSearchModule} from '../../../../../modules/select-picker-with-search/select-picker-with-search.module';

@NgModule({
    declarations: [FleetDriverAddComponent],
    imports: [
        CommonModule,
        FleetDriverAddRoutingModule,
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
        MatRadioModule,
    ],
    providers: [
        MatDatepickerModule,
    ],
})
export class FleetDriverAddModule { }
