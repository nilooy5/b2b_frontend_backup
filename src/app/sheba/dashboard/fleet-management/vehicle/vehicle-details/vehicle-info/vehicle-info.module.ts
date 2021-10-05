import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';


import { VehicleInfoRoutingModule } from './vehicle-info-routing.module';
import {VehicleInfoComponent} from './vehicle-info.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';
import {
    MatAutocompleteModule,
    MatDatepickerModule,
    MatDividerModule,
    MatNativeDateModule,
    MatSelectModule
} from '@angular/material';

@NgModule({
    declarations: [
        VehicleInfoComponent,
    ],
    imports: [
        CommonModule,
        VehicleInfoRoutingModule,
        MatTabsModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule,

        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatDividerModule
    ]
})
export class VehicleInfoModule { }
