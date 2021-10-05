import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverInfoRoutingModule } from './driver-info-routing.module';
import {DriverInfoComponent} from './driver-info.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';
import {MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule} from '@angular/material';

@NgModule({
    declarations: [
        DriverInfoComponent
    ],
    imports: [
        CommonModule,
        DriverInfoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule,

        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatAutocompleteModule,
    ]
})
export class DriverInfoModule { }
