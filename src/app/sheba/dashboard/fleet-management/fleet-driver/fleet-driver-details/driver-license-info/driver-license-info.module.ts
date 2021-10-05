import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverLicenseInfoRoutingModule } from './driver-license-info-routing.module';
import {DriverLicenseInfoComponent} from './driver-license-info.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';
import {MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule} from '@angular/material';

@NgModule({
    declarations: [
        DriverLicenseInfoComponent
    ],
    imports: [
        CommonModule,
        DriverLicenseInfoRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule,

        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatAutocompleteModule,
    ]
})
export class DriverLicenseInfoModule { }
