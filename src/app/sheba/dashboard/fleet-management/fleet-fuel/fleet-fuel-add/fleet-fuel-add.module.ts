import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetFuelAddRoutingModule } from './fleet-fuel-add-routing.module';
import {FleetFuelAddComponent} from './fleet-fuel-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {ConfirmMessageModule} from '../../confirm-message/confirm-message.module';
import {ShebaWidgetsModule} from '../../../../../modules/sheba-widgets/sheba-widgets.module';
import {OnlyDatePickerModule} from '../../../../../modules/only-date-picker/only-date-picker.module';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {SelectPickerWithSearchModule} from '../../../../../modules/select-picker-with-search/select-picker-with-search.module';

@NgModule({
    declarations: [
        FleetFuelAddComponent
    ],
    imports: [
        CommonModule,
        FleetFuelAddRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        ConfirmMessageModule,
        ShebaWidgetsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        OnlyDatePickerModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        SelectPickerWithSearchModule,
    ]
})
export class FleetFuelAddModule { }
