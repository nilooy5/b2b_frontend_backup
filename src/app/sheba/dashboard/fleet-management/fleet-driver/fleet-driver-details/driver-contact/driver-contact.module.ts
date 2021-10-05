import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverContactRoutingModule } from './driver-contact-routing.module';
import {DriverContactComponent} from './driver-contact.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';
import {MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule} from '@angular/material';

@NgModule({
    declarations: [
        DriverContactComponent
    ],
    imports: [
        CommonModule,
        DriverContactRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule,
        MatSelectModule,
    ]
})
export class DriverContactModule { }
