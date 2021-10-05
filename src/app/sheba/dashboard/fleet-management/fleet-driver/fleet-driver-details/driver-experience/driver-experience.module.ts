import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverExperienceRoutingModule } from './driver-experience-routing.module';
import {DriverExperienceComponent} from './driver-experience.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormDirectivesModule} from '../../../../../../directives/form-directives/form-directives.module';
import {MatSelectModule} from '@angular/material';

@NgModule({
    declarations: [
        DriverExperienceComponent
    ],
    imports: [
        CommonModule,
        DriverExperienceRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        FormDirectivesModule,
        MatSelectModule,
    ]
})
export class DriverExperienceModule { }
